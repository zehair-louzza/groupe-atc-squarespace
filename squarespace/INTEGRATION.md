# Intégration native dans Squarespace 7.1

## Site identifié

Site existant : `https://mandolin-jaguar-flrs.squarespace.com/config/pages`. Domaine final demandé : `anelecgroupe.com`. Ne pas créer un second site, changer un abonnement, toucher aux DNS ou remplacer les pages existantes sans accord sur l’étape correspondante.

## État réel au 28 octobre 2026

L’utilisateur a autorisé les six brouillons désactivés et l’affichage du nom GROUPE ATC. Les six pages sont créées hors navigation, leurs textes sont enregistrés dans des blocs Markdown natifs et leur état désactivé a été relu dans les paramètres Général.

Le titre du site et son en-tête affichent GROUPE ATC. La navigation et les anciennes pages sont conservées ; aucun bouton de publication n’a été utilisé et aucune nouvelle page n’a été activée.

Les textes sources effectivement saisis sont dans `native/`. Les adresses réelles des brouillons emploient `/groupe-atc-accueil`, `/groupe-atc-maintenance`, `/groupe-atc-metiers`, `/groupe-atc-groupe`, `/groupe-atc-contact` et `/groupe-atc-informations`, et non les adresses finales de conception du manifeste.

La reproduction graphique complète de la maquette n’est pas achevée : il reste notamment les compositions multisections, les images, les boutons dédiés, le formulaire natif et la réception graphique finale. Aucun formulaire de collecte n’est actif dans les six pages.

Les données de contrôle sont dans `../docs/native-squarespace-results.json`. Les six contenus et les six états désactivés ont été vérifiés ; les mesures mobiles natives portent uniquement sur Accueil et Contact, sans débordement horizontal ni contenu de bloc tronqué détecté. Les captures Comet échouent par expiration et la vue mobile de Maintenance ne se stabilise pas ; ne pas présenter cette étape comme une validation visuelle complète.

## Avant les modifications

1. Conserver l’autorisation déjà donnée pour les six brouillons ; demander un accord distinct pour la publication.
2. Relever les pages existantes et leurs paramètres ; ne supprimer ni Boutique, ni Services, ni les mentions existantes.
3. Préparer des pages désactivées ou un environnement à accès restreint. Ne pas considérer « Hors navigation » comme une protection d’accès.
4. Valider le courriel `contact@aneleggroupe.com`, différent du domaine du site.

## Construction des pages

Le fichier `pages.json` donne les titres et adresses finales de conception ; le dossier `native/` décrit les brouillons réellement enregistrés sans remplacement des pages existantes. Les contenus de `src/templates.mjs` restent la référence visuelle et éditoriale pour la mise en page à terminer avec des blocs natifs : texte, image, bouton et formulaire.

- Accueil : premier écran en deux colonnes, trois besoins en lignes, quatre métiers, méthode et territoire.
- Maintenance : proposition non activée, tableau des trois formules, périmètre, compte rendu et conditions.
- Travaux et métiers : quatre sections avec ancres, et section dépannage.
- Le groupe : intitulé complet, renommage ANELEC, ancien logo identifié comme historique.
- Contact : formulaire natif avec questions conditionnelles si disponibles dans le forfait et dans l’éditeur.

La page Informations est un contenu temporaire de préparation ; compléter les mentions et la politique de confidentialité avant publication.

## Style

Bleu nuit `#142536`, blanc minéral `#F4F5F3`, cobalt `#264ED8`, gris ardoise `#5C6670`. Utiliser les styles globaux d’abord, puis un éventuel CSS limité après inspection des blocs réels. Ne pas coller l’ensemble de `site/index.html` dans un bloc de code et le présenter comme un site natif.

Les styles de la prévisualisation emploient Switzer et General Sans. Dans Squarespace, choisir des familles disponibles ou configurer les polices autorisées après validation ; les substitutions doivent être vérifiées sur mobile.

## Formulaire final

Reproduire les champs de la prévisualisation dans un bloc Form natif. Configurer explicitement le destinataire et les options de stockage ; ne pas hériter sans vérification du courriel de l’administrateur.

Ne pas conserver le bouton « Préparer ma demande » comme faux envoi serveur. Après configuration et test autorisé, utiliser « Envoyer ma demande », afficher le message de confirmation réel et documenter la collecte dans la confidentialité.

## Réalisations différées

Le modèle est préparé dans `data/project.schema.json`, avec une liste vide dans `data/projects.json` et le drapeau `features.projects=false`. Plus tard, créer une collection de réalisations adaptée aux options de l’éditeur, puis vérifier chaque cas : photos, description, localisation, attribution et droits.

Tant que ces contenus ne sont pas disponibles, ne publier ni exemples fictifs, ni faux logos clients, ni page vide mise en avant.

## Contrôle et publication

Vérifier chaque page à 1440 px et 375 px, le menu, les liens, les ancres, les formulations de maintenance et le formulaire. Demander un accord distinct avant ouverture publique, bascule du domaine, redirection, souscription ou déploiement Vercel.
