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

Le domaine final est `anelecgroupe.com`. Le courriel confirmé et corrigé par l’utilisateur est `contact@anelecgroupe.com` ; l’ancienne saisie avec deux « g » est à écarter.

Le logo ANELEC est préservé sans modification et présenté comme historique. La palette du site est indépendante des couleurs de cet ancien logo. Les photographies sont des illustrations et ne sont pas des références de chantier.

La fonction réalisations est désactivée. Elle n’émet ni page, ni navigation, ni données structurées tant qu’elle reste désactivée ; lorsqu’elle sera activée, seuls les projets approuvés avec droits et attribution confirmés seront retenus.

Les formules de maintenance sont des propositions non activées. Aucun tarif, délai d’intervention garanti ou astreinte permanente n’est inventé.

## Limites de la prévisualisation

Le formulaire de la prévisualisation prépare localement un récapitulatif et un lien de messagerie. Il ne stocke et ne transmet aucune demande ; le visiteur reste responsable de l’envoi dans son logiciel de messagerie. Le formulaire Squarespace distinct utilise désormais un bloc Form natif avec réception configurée à contact@anelecgroupe.com sur une page désactivée ; aucun envoi réel n’a été testé.

Le site inclut `noindex,nofollow`. Les mentions légales finales doivent être complétées avant publication publique ; la page Informations actuelle n’est pas une politique définitive.

Aucun DNS, abonnement, dépôt distant ou déploiement Vercel n’est modifié par les commandes locales. Cette base n’est pas une conversion automatique en pages Fluid Engine.

## Brouillons natifs enregistrés

Six pages ont été créées dans le site Squarespace existant avec les textes de `squarespace/native/`, hors navigation et désactivées. Le nom GROUPE ATC est enregistré dans l’en-tête et le titre du site.

Les slugs réels des brouillons portent le préfixe `/groupe-atc-` pour préserver les adresses existantes. Leur contenu et leur désactivation ont été vérifiés ; les contrôles et leurs limites sont documentés dans `docs/QA.md` et `docs/native-squarespace-results.json`.

La composition native est enregistrée pour Accueil (4 sections), Maintenance (4), Métiers (5), Groupe (4), Contact (4) et Informations (5), soit 26 sections. Les styles sont propres aux pages ; l’illustration d’accueil, le logo historique de Groupe et le formulaire de Contact sont des blocs natifs. Le pied de page générique a été remplacé par l’identité et les coordonnées corrigées.

La finalisation reste incomplète : le dernier contrôle a retrouvé des options de gabarit dans le menu du formulaire, puis Comet a perdu sa connexion de contrôle. La liste doit être corrigée selon `squarespace/native/form-spec.json`, la dernière révision CSS doit être réappliquée uniformément et la réception native complète reste à effectuer. Ne pas activer les pages.

Le panier et le bouton Réserver ont été retirés de l’en-tête. La boutique est hors navigation, sans suppression de données ; sa désactivation n’a pas été obtenue. Les six nouvelles pages n’ont pas été activées.

`squarespace/native/design.css` et `layout.json` décrivent les styles et les contenus Markdown ; Contact comporte en plus une section de formulaire configurée dans l’éditeur. Le rapport `docs/etat-integration-squarespace.md` et les relevés de réception font foi sur l’avancement réel ; la prévisualisation privée reste distincte de l’intégration native.
