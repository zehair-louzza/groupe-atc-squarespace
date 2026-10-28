# Intégration native dans Squarespace 7.1

## Site identifié

Site existant : `https://mandolin-jaguar-flrs.squarespace.com/config/pages`. Domaine final demandé : `anelecgroupe.com`. Ne pas créer un second site, changer un abonnement, toucher aux DNS ou remplacer les pages existantes sans accord sur l’étape correspondante.

## Avant les modifications

1. Confirmer le périmètre d’enregistrement des brouillons.
2. Relever les pages existantes et leurs paramètres ; ne supprimer ni Boutique, ni Services, ni les mentions existantes.
3. Préparer des pages désactivées ou un environnement à accès restreint. Ne pas considérer « Hors navigation » comme une protection d’accès.
4. Valider le courriel `contact@aneleggroupe.com`, différent du domaine du site.

## Construction des pages

Les fichiers `pages.json` donnent les titres et les adresses de départ. Les contenus de `src/templates.mjs` sont la base éditoriale, à reproduire avec des blocs natifs : texte, image, bouton et formulaire.

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
