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
- Mot de passe d'application Zoho renseigné par l'utilisateur ; test réel du 02/11/2026 à 17:45 : réponse {ok:true} et demande reçue dans la boîte de réception de contact@anelecgroupe.com.

## Indexation et engagements (2 novembre 2026)
- Indexation activée à la demande de l'entreprise (`publicationApproved: true`), malgré l'absence du médiateur de la consommation, qui reste à renseigner dans `data/legal.json`.
- Engagements confirmés et publiés : urgences et astreinte 6j/7, devis en moins de 48 h, +1 200 interventions par an. Tarifs : à ne pas publier.
- Auto-déploiement Hostinger actif. Le workflow pousse désormais sans réécrire l'historique de la branche (le push forcé provoquait « shallow file has changed » chez Hostinger).

## Vérification de l'indexation (2 novembre 2026, 18 h 20)
- Le CDN Hostinger servait encore l'ancien robots.txt (`Disallow: /`, statut HIT). Cache vidé dans hPanel → Performance → CDN → Flush cache ; robots.txt correct depuis.
- À refaire après tout changement de robots.txt ou de sitemap : vider le cache CDN.
- Les 8 pages du sitemap répondent 200, `index,follow`, sans X-Robots-Tag, canonique exacte ; 404 réelle en `noindex`.
- PageSpeed Insights (mobile) : SEO 100, performances 97, accessibilité 91, bonnes pratiques 100.
- Un faux Googlebot (user-agent imité) reçoit 403 : filtre anti-robots d'Hostinger ; à confirmer avec l'inspection d'URL de Google Search Console.
