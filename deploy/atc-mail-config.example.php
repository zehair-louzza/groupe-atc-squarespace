<?php
// À copier SUR HOSTINGER, hors du dossier public :
//   domains/anelecgroupe.com/atc-mail-config.php   (à côté de public_html, PAS dedans)
// Ne jamais versionner le vrai fichier sur GitHub.
return [
  'username' => 'contact@anelecgroupe.com',          // boîte Zoho qui envoie
  'password' => 'COLLER_ICI_LE_MOT_DE_PASSE_D_APPLICATION_ZOHO',
  'to'       => 'contact@anelecgroupe.com',          // boîte qui reçoit les demandes
  'hosts'    => ['smtppro.zoho.eu', 'smtp.zoho.eu'],  // offre payante, puis offre gratuite
  'port'     => 465,
  'salt'     => 'remplacer-par-une-phrase-aleatoire',
];
