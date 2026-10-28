# GROUPE ATC : préparation du site Squarespace

GROUPE ATC signifie « GROUPE ANELEC TECHNIQUE ET CONCEPTE », selon l’orthographe communiquée le 28 octobre 2026. ANELEC a simplement été renommée ; aucune filiale nouvelle n’est présentée.

## Structure

- `data/site.json` : marque, intitulé complet, coordonnées et propositions de maintenance.
- `src/templates.mjs` : contenus et gabarits éditables.
- `site/` : prévisualisation statique privée, six pages.
- `data/projects.json` et `data/project.schema.json` : architecture de réalisations différées, sans exemples inventés.
- `squarespace/` : manifeste de conception, consignes d’intégration et sources des six brouillons natifs enregistrés.
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

## Brouillons natifs enregistrés

Six pages ont été créées dans le site Squarespace existant avec les textes de `squarespace/native/`, hors navigation et désactivées. Le nom GROUPE ATC est enregistré dans l’en-tête et le titre du site.

Les slugs réels des brouillons portent le préfixe `/groupe-atc-` pour préserver les adresses existantes. Leur contenu et leur désactivation ont été vérifiés ; les contrôles et leurs limites sont documentés dans `docs/QA.md` et `docs/native-squarespace-results.json`.

Cette étape est une intégration éditoriale native, pas la reproduction graphique achevée de la prévisualisation. La mise en page finale, les visuels et boutons dédiés, le formulaire et la réception graphique complète restent à effectuer avant tout accord de publication.
