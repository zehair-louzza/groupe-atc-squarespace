<?php
/**
 * GROUPE ATC — réception des demandes du formulaire de contact.
 * Envoie la demande à contact@anelecgroupe.com par le SMTP Zoho (SPF du domaine : include:zohomail.eu).
 * Les identifiants ne sont JAMAIS dans ce fichier : ils sont lus dans un fichier placé
 * hors du dossier public (voir docs/formulaire-envoi.md) :
 *   domains/anelecgroupe.com/atc-mail-config.php  (au même niveau que public_html)
 */
declare(strict_types=1);
date_default_timezone_set('Europe/Paris');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function reply(int $code, array $body): never { http_response_code($code); echo json_encode($body, JSON_UNESCAPED_UNICODE); exit; }
function clean(string $v, int $max, bool $multiline = false): string {
  $v = trim(str_replace("\0", '', $v));
  $v = $multiline ? preg_replace("/\r\n?/", "\n", $v) : preg_replace('/[\r\n\t]+/', ' ', $v);
  return mb_substr((string)$v, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(405, ['ok' => false, 'error' => 'Méthode non autorisée.']);

// Même origine uniquement
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https://(www\.)?anelecgroupe\.com$#', $origin)) reply(403, ['ok' => false, 'error' => 'Origine refusée.']);

$raw = file_get_contents('php://input', false, null, 0, 20000) ?: '';
$in = json_decode($raw, true);
if (!is_array($in)) reply(400, ['ok' => false, 'error' => 'Requête invalide.']);
$get = fn(string $k, int $max, bool $ml = false) => clean(is_string($in[$k] ?? null) ? $in[$k] : '', $max, $ml);

// Anti-robots : champ invisible rempli ou envoi trop rapide (< 4 s) => accepté en silence, rien n'est envoyé
$elapsed = (int)($in['elapsed'] ?? 0);
if ($get('site_web', 200) !== '' || $elapsed < 4000) reply(200, ['ok' => true]);

$data = [
  'besoin' => $get('besoin', 40), 'metier' => $get('metier', 60), 'urgence' => ($in['urgence'] ?? '') === 'Oui' ? 'Oui' : 'Non',
  'commune' => $get('commune', 120), 'ville_carte' => $get('ville_carte', 160), 'formule' => $get('formule', 40),
  'description' => $get('description', 4000, true), 'profil' => $get('profil', 20), 'entreprise' => $get('entreprise', 120),
  'siret' => preg_replace('/\D/', '', $get('siret', 20)), 'nom' => $get('nom', 120), 'courriel' => $get('courriel', 160), 'telephone' => $get('telephone', 30),
];
$errors = [];
foreach (['besoin', 'metier', 'commune', 'description', 'nom', 'courriel'] as $k) if ($data[$k] === '') $errors[] = $k;
if ($data['courriel'] !== '' && !filter_var($data['courriel'], FILTER_VALIDATE_EMAIL)) $errors[] = 'courriel';
if ($data['profil'] === 'Professionnel') {
  if ($data['entreprise'] === '') $errors[] = 'entreprise';
  if (!preg_match('/^\d{14}$/', $data['siret'])) $errors[] = 'siret';
}
if ($errors) reply(422, ['ok' => false, 'error' => 'Champs manquants ou invalides.', 'fields' => array_values(array_unique($errors))]);

$base = dirname(__DIR__, 2);                       // domains/anelecgroupe.com
$configFile = $base . '/atc-mail-config.php';
if (!is_file($configFile)) reply(503, ['ok' => false, 'error' => 'Envoi non configuré.']);
$cfg = require $configFile;
if (!is_array($cfg) || empty($cfg['password']) || str_contains((string)$cfg['password'], 'COLLER')) reply(503, ['ok' => false, 'error' => 'Envoi non configuré.']);

// Limite : 5 demandes par heure et par adresse IP (empreinte, IP non conservée en clair)
$dir = $base . '/atc-data';
if (!is_dir($dir)) @mkdir($dir, 0700, true);
$key = $dir . '/rl-' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . ($cfg['salt'] ?? 'atc')) . '.json';
$now = time(); $hits = [];
if (is_file($key)) $hits = array_filter((array)json_decode((string)file_get_contents($key), true), fn($t) => $t > $now - 3600);
if (count($hits) >= 5) reply(429, ['ok' => false, 'error' => 'Trop de demandes. Réessayez plus tard ou appelez-nous.']);

$lines = [];
if ($data['urgence'] === 'Oui') $lines[] = "⚠ INTERVENTION URGENTE DEMANDÉE\n";
$lines[] = "Nouvelle demande reçue depuis le site anelecgroupe.com\n";
$lines[] = "Besoin : {$data['besoin']}";
$lines[] = "Métier : {$data['metier']}";
$lines[] = "Urgence : {$data['urgence']}";
$lines[] = "Commune : {$data['commune']}";
if ($data['ville_carte'] !== '') $lines[] = "Ville sélectionnée sur la carte : {$data['ville_carte']}";
if ($data['formule'] !== '') $lines[] = "Formule à étudier : {$data['formule']}";
$lines[] = "\nDescription :\n{$data['description']}\n";
$lines[] = "Profil : " . ($data['profil'] ?: 'Non précisé');
if ($data['profil'] === 'Professionnel') { $lines[] = "Entreprise : {$data['entreprise']}"; $lines[] = 'SIRET : ' . trim(chunk_split($data['siret'], 3, ' ')); }
$lines[] = "Nom : {$data['nom']}";
$lines[] = "Courriel : {$data['courriel']}";
$lines[] = 'Téléphone : ' . ($data['telephone'] ?: 'Non renseigné');
$lines[] = "\n—\nRépondez directement à ce message pour écrire au client.\nEnvoyé le " . date('d/m/Y à H:i') . ' (heure de Paris).';
$body = implode("\n", $lines);
$subject = ($data['urgence'] === 'Oui' ? 'URGENT – ' : '') . "Demande site : {$data['besoin']} – {$data['metier']} – {$data['commune']}";

$from = $cfg['username'];                          // doit être la boîte Zoho authentifiée
$to = $cfg['to'] ?? $from;
$enc = fn(string $s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
$headers = [
  'Date: ' . date(DATE_RFC2822),
  'From: ' . $enc('Site GROUPE ATC') . " <$from>",
  "To: <$to>",
  'Reply-To: ' . $enc($data['nom']) . ' <' . $data['courriel'] . '>',
  'Subject: ' . $enc($subject),
  'Message-ID: <' . bin2hex(random_bytes(12)) . '@anelecgroupe.com>',
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: base64',
  'X-Mailer: GROUPE ATC formulaire',
];
if ($data['urgence'] === 'Oui') { $headers[] = 'X-Priority: 1 (Highest)'; $headers[] = 'Importance: High'; }
$message = implode("\r\n", $headers) . "\r\n\r\n" . rtrim(chunk_split(base64_encode($body), 76, "\r\n"));

function smtp_send(string $host, int $port, string $user, string $pass, string $from, string $to, string $message): ?string {
  $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
  $s = @stream_socket_client("ssl://$host:$port", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
  if (!$s) return "connexion $host : $errstr";
  stream_set_timeout($s, 20);
  $read = function () use ($s) { $out = ''; while (($l = fgets($s, 1024)) !== false) { $out .= $l; if (isset($l[3]) && $l[3] === ' ') break; } return $out; };
  $cmd = function (?string $c, string $expect) use ($s, $read) { if ($c !== null) fwrite($s, $c . "\r\n"); $r = $read(); return str_starts_with($r, $expect) ? null : trim($r); };
  foreach ([[null, '220'], ['EHLO anelecgroupe.com', '250'], ['AUTH LOGIN', '334'], [base64_encode($user), '334'], [base64_encode($pass), '235'],
            ["MAIL FROM:<$from>", '250'], ["RCPT TO:<$to>", '250'], ['DATA', '354'], [$message . "\r\n.", '250']] as [$c, $e]) {
    if ($err = $cmd($c, $e)) { fclose($s); return ($e === '235' ? 'authentification refusée' : 'SMTP') . " ($host) : " . substr($err, 0, 160); }
  }
  $cmd('QUIT', '221'); fclose($s); return null;
}

$hosts = $cfg['hosts'] ?? ['smtppro.zoho.eu', 'smtp.zoho.eu'];
$error = null;
foreach ($hosts as $h) { $error = smtp_send($h, (int)($cfg['port'] ?? 465), $cfg['username'], $cfg['password'], $from, $to, $message); if ($error === null) break; }
if ($error !== null) { @error_log('[GROUPE ATC formulaire] ' . $error); reply(502, ['ok' => false, 'error' => 'Envoi impossible pour le moment.']); }

$hits[] = $now; @file_put_contents($key, json_encode(array_values($hits)), LOCK_EX);
reply(200, ['ok' => true]);
