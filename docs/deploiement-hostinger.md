# GROUPE ATC : préparation du futur déploiement Hostinger

Le dépôt privé [groupe-atc-squarespace](https://github.com/zehair-louzza/groupe-atc-squarespace) conserve deux réalisations distinctes : les sources autonomes du site et les éléments de mise en page native Squarespace. Vous avez demandé un hébergement Hostinger ultérieur ; aucune connexion à Hostinger, mise en ligne ou modification de DNS n’a été effectuée.

## Version à utiliser

La version autonome se construit avec `npm run build`, puis se vérifie avec `npm test`. Le dossier généré `site/` contient les six pages HTML, les styles, le JavaScript et les images ; il ne nécessite pas l’éditeur Squarespace pour afficher ses contenus.

- **Accueil :** `site/index.html`.
- **Maintenance :** `site/maintenance.html`.
- **Métiers :** `site/metiers.html`.
- **Groupe :** `site/groupe.html`.
- **Contact :** `site/contact.html`.
- **Informations :** `site/informations.html`, à compléter juridiquement avant lancement.

Les fichiers de `squarespace/native/` documentent l’autre version, administrée dans Squarespace. Ils ne constituent pas un export automatique de Fluid Engine ni un thème à installer sur Hostinger.

## Procédure prévue, à exécuter plus tard

Lors de la préparation du compte, choisir un hébergement permettant les fichiers HTML personnalisés ; Hostinger documente un type de site « PHP/HTML website » pour ce cas ([création d’un site Hostinger](https://docs.hostinger.com/getting-started/creating-your-first-website)). Vérifier le contrat et l’environnement réellement disponibles avant de choisir le mode de transfert.

Après validation de la version finale, transférer le contenu du dossier `site/`, avec `index.html` à la racine de `public_html`, et non l’ensemble du dépôt ; Hostinger précise que les fichiers placés dans `public_html` sont accessibles publiquement ([gestion des fichiers Hostinger](https://docs.hostinger.com/websites/file-manager)). Ne pas y déposer `.git/`, `docs/`, les sources de construction, des identifiants ou des sauvegardes.

Prévoir d’abord une recette sur une adresse de test, puis une décision séparée de bascule du domaine `anelecgroupe.com`. Ne pas écraser un site existant ni changer les enregistrements de messagerie sans sauvegarde, inventaire et autorisation spécifiques.

## Points bloquant un lancement commercial

- **Formulaire :** la version autonome prépare actuellement un récapitulatif local et un lien de messagerie ; aucun serveur ne reçoit automatiquement la demande. Le bloc Form Squarespace configuré vers `contact@anelecgroupe.com` ne migre pas avec ces fichiers.
- **Traitement réel :** choisir et intégrer ultérieurement un traitement serveur ou un prestataire de formulaires, avec validation, protection contre les abus, gestion des erreurs et test de réception autorisé. Aucun secret ne doit être ajouté au JavaScript public.
- **Mentions et confidentialité :** confirmer l’entité juridique, le SIREN, la forme sociale, le directeur de publication, l’hébergeur, les traitements et les durées de conservation.
- **Référencement :** conserver `noindex,nofollow` pendant la préparation ; ne le retirer qu’après validation de la version publique. Les réalisations restent désactivées tant que leurs contenus et droits ne sont pas confirmés.
- **Adresses et redirections :** établir la correspondance des anciennes URL avec les nouvelles pages avant migration. Les adresses `/groupe-atc-*` désignent des brouillons Squarespace, pas les routes finales imposées à Hostinger.
- **Domaine et messagerie :** préserver `anelecgroupe.com`, le courriel `contact@anelecgroupe.com` et les enregistrements nécessaires à la messagerie ; planifier la bascule séparément.

## État de préparation

Les sources sont versionnées sur la branche `main` du nouveau dépôt privé. Le site n’est pas déployé sur Hostinger ; la génération HTML et les contrôles locaux ne valent ni publication ni validation d’un formulaire serveur.
