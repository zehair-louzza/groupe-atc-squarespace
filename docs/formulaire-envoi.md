# Envoi automatique des demandes du formulaire

Le formulaire de `contact.html` envoie la demande en POST (JSON) à `/api/demande.php`.
Le script transmet un courriel à **contact@anelecgroupe.com** via le SMTP Zoho
(`smtppro.zoho.eu:465`, puis `smtp.zoho.eu` en secours). Passer par Zoho est obligatoire :
le SPF du domaine (`v=spf1 include:zohomail.eu ~all`) n'autorise que Zoho à envoyer.

- Expéditeur : « Site GROUPE ATC » <contact@anelecgroupe.com> ; « Répondre à » = courriel du client.
- Objet préfixé « URGENT – » si la case « Intervention urgente » est cochée.
- Protections : origine anelecgroupe.com, champ piège, délai minimal de 4 s, 5 envois / heure / IP.
- En cas d'échec, le visiteur retrouve le récapitulatif avec « Ouvrir ma messagerie ».

## Configuration (une seule fois, sur Hostinger)
1. Zoho Mail → Mon compte → Sécurité → Mots de passe d'application → créer « Site Hostinger ».
2. hPanel → Gestionnaire de fichiers → `domains/anelecgroupe.com/` (au même niveau que `public_html`, **pas dedans**).
3. Créer `atc-mail-config.php` à partir de `deploy/atc-mail-config.example.php` et y coller le mot de passe d'application.

Le vrai fichier n'est **jamais** versionné (`.gitignore`).

## État de la mise en ligne (2 novembre 2026)
- hPanel → Advanced → GIT : dépôt `groupe-atc-squarespace`, branche `hostinger-deploy`, dossier `public_html` ; déploiement terminé.
- https://anelecgroupe.com sert le site (en-tête `X-Robots-Tag: noindex, nofollow`).
- Ni les DNS ni les serveurs de noms (NS) n'ont été modifiés ; les MX Zoho sont intacts.
- `atc-mail-config.php` a été créé dans le gestionnaire de fichiers, à la racine du site (à côté de `public_html`), avec l'emplacement du mot de passe à remplir.
