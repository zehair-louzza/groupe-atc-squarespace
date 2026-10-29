# GROUPE ATC : site web et intégration Squarespace

GROUPE ATC signifie « GROUPE ANELEC TECHNIQUE ET CONCEPTE », selon l’orthographe communiquée. Il s’agit de la même société qu’ANELEC, avec une nouvelle dénomination sociale et une nouvelle présidence, et non d’une création de société ou de filiale.

## Identité de l’entreprise actualisée

Les captures fournies le 29 octobre sont reprises dans `data/legal.json` et recoupées avec l’[Annuaire des Entreprises](https://annuaire-entreprises.data.gouv.fr/entreprise/933108607) et la [fiche Pappers](https://www.pappers.fr/entreprise/anelec-technique-et-concept-933108607). Les identifiants, la SAS au capital de 3 000 €, la présidente Najoua Boughrara et les deux inscriptions distinctes Sirene/RNE sont renseignés.

La mention « Nos techniciens et notre directeur de travaux disposent de plus de 10 ans d’expérience dans leur domaine » est une confirmation explicite de l’entreprise. Elle ne décrit pas l’ancienneté de la société.

Les pages natives Mentions légales et À propos, ainsi que les pages hors navigation Accueil, Groupe et Informations, sont enregistrées et contrôlées au bureau et sur téléphone. Les trois dernières étaient déjà activées et leur activation n’a pas été modifiée ; elles ne doivent pas être décrites comme des brouillons désactivés. La direction de publication et les coordonnées légales complètes de l’hébergeur restent à confirmer.

## Nouvelle préparation des galeries photo

Le site autonome propose maintenant un carrousel avec flèches pour chacun des six services, conformément au choix utilisateur. Les trois emplacements de démonstration par métier restent clairement identifiés ; aucune photo de chantier n'a encore été fournie. Les galeries prennent en charge les photos autorisées via `data/services.json`, le clavier, les flèches et le balayage tactile, sans défilement automatique.

Cette fonction n’est pas encore intégrée au site Squarespace : ses six blocs image natifs restent à une image. Les sources autonomes sont conservées dans le dépôt dédié ; le mode d'emploi et cette distinction sont détaillés dans `docs/carrousels-photos.md`.

## Dernière correction de périmètre

La page Services présente six familles documentées : plomberie, électricité, serrurerie, rénovation intérieure, maçonnerie et menuiserie. Les deux derniers métiers sont explicitement nommés page 2 du PDF ANELEC. Un test de non-régression contrôle l’absence des spécialités écartées par l’utilisateur.

La page `/services-content` est enregistrée et relue avec trente champs, six listes métier et six blocs image natifs à compléter. En consultation : trois services par ligne, soit deux rangées sur ordinateur, puis une colonne sur mobile. Le contenu et les identifiants sont dans `squarespace/native/existing-services.json`, et la mise en page spécifique dans `squarespace/native/services.css`. Les six tests unitaires et les neuf parcours du site autonome passent.

La correction précédente de Maintenance reste conservée et son dernier réglage observé est désactivé. Cette passe ne réactive aucun nouveau brouillon et ne recontrôle pas leurs interrupteurs. Les relevés actuels de Services sont `docs/native-services-desktop-verification.json` et `docs/native-services-mobile-verification.json` ; le contrôle précédent reste historique dans `docs/native-scope-verification.json`.

## Structure

- `data/site.json` : marque, intitulé complet, coordonnées et propositions de maintenance.
- `data/services.json` : six familles et dix-sept lignes de prestations documentées.
- `src/templates.mjs` : contenus et gabarits éditables.
- `site/` : prévisualisation statique privée, six pages.
- `data/projects.json` et `data/project.schema.json` : architecture de réalisations différées, sans exemples inventés.
- `squarespace/` : manifeste de conception, consignes d’intégration et sources des six brouillons natifs enregistrés.
- `docs/` : inventaire de réception.

## Commandes

Exécuter `npm run build`, puis `npm test`. La prévisualisation fonctionne avec `npm run preview` sur le port 3000.

## Dépôt privé et futur hébergement Hostinger

Le dépôt dédié est [groupe-atc-squarespace](https://github.com/zehair-louzza/groupe-atc-squarespace), privé. Son nom rappelle le chantier natif actuel, mais les sources autonomes sont conservées pour un futur hébergement sur Hostinger demandé par l’utilisateur.

- **Version autonome :** `site/`, générée par `npm run build`, avec les six pages HTML, leurs styles, scripts et images.
- **Version native :** `squarespace/native/`, textes, style commun et paramètres de référence des blocs Squarespace.
- **Hostinger :** préparation pour plus tard, sans connexion au compte Hostinger, transfert, publication ni modification du domaine aujourd’hui.
- **Formulaire :** le bloc Squarespace ne migre pas avec les pages HTML ; la version autonome nécessite un vrai traitement de demande avant son lancement commercial.

La procédure différée et les points de validation figurent dans [`docs/deploiement-hostinger.md`](docs/deploiement-hostinger.md). Aucun transfert Hostinger ni changement de domaine n’est lancé par la création de ce dépôt.

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

La liste du formulaire a été corrigée selon `squarespace/native/form-spec.json` et les six choix ont été retrouvés après réouverture de Contact. La destination, l’inscription marketing décochée et le message post-envoi ont été relus ; aucun test de transmission n’a été effectué. La dernière CSS a maintenant été enregistrée une seule fois sur chacune des six pages et leurs vues bureau/mobile ont été contrôlées, avec des captures et relevés `docs/native-final-*.json`. La navigation interne et une saisie longue sans envoi ont également été testées ; le menu mobile natif en aperçu plein écran n’a pas pu être validé après un blocage de Comet. Ne pas activer les pages.

Le panier et le bouton Réserver ont été retirés de l’en-tête. La boutique est hors navigation, sans suppression de données ; sa désactivation n’a pas été obtenue. Les six nouvelles pages n’ont pas été activées.

`squarespace/native/design.css` et `layout.json` décrivent les styles et les contenus Markdown ; Contact comporte en plus une section de formulaire configurée dans l’éditeur. Le rapport `docs/etat-integration-squarespace.md` et les relevés de réception font foi sur l’avancement réel ; la prévisualisation privée reste distincte de l’intégration native.
