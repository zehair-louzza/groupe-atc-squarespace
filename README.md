# GROUPE ATC : préparation du site Squarespace

GROUPE ATC signifie « GROUPE ANELEC TECHNIQUE ET CONCEPTE », selon l’orthographe communiquée le 28 octobre 2026. ANELEC a simplement été renommée ; aucune filiale nouvelle n’est présentée.

## Structure

- `data/site.json` : marque, intitulé complet, coordonnées et propositions de maintenance.
- `src/templates.mjs` : contenus et gabarits éditables.
- `site/` : prévisualisation statique privée, six pages.
- `data/projects.json` et `data/project.schema.json` : architecture de réalisations différées, sans exemples inventés.
- `squarespace/` : manifeste de pages et consignes de reconstruction native.
- `docs/` : inventaire de réception.

## Commandes

Exécuter `npm run build`, puis `npm test`. La prévisualisation fonctionne avec `npm run preview` sur le port 3000.

## Contraintes conservées

Le domaine final est `anelecgroupe.com`. Le courriel fourni est exactement `contact@aneleggroupe.com`, avec un domaine différent ; il n’a pas été corrigé par supposition et sa destination doit être confirmée avant activation d’un formulaire.

Le logo ANELEC est préservé sans modification et présenté comme historique. La palette du site est indépendante des couleurs de cet ancien logo. Les photographies sont des illustrations et ne sont pas des références de chantier.

La fonction réalisations est désactivée. Elle n’émet ni page, ni navigation, ni données structurées tant qu’elle reste désactivée ; lorsqu’elle sera activée, seuls les projets approuvés avec droits et attribution confirmés seront retenus.

Les formules de maintenance sont des propositions non activées. Aucun tarif, délai d’intervention garanti ou astreinte permanente n’est inventé.

## Limites de la prévisualisation

Le formulaire prépare localement un récapitulatif et un lien de messagerie. Il ne stocke et ne transmet aucune demande ; le visiteur reste responsable de l’envoi dans son logiciel de messagerie. La version Squarespace doit utiliser un bloc Form natif et une destination validée.

Le site inclut `noindex,nofollow`. Les mentions légales finales doivent être complétées avant publication publique ; la page Informations actuelle n’est pas une politique définitive.

Aucun DNS, abonnement, dépôt distant ou déploiement Vercel n’est modifié par les commandes locales. Cette base n’est pas une conversion automatique en pages Fluid Engine.
