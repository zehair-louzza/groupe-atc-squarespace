# GROUPE ATC : état d’intégration dans Squarespace

Mise à jour du 29 octobre 2026 : les informations légales, la continuité de la société et l’expérience des équipes sont renseignées dans les pages Squarespace et les sources autonomes. La page Services conserve ses six rubriques et sa grille de trois colonnes sur ordinateur.

## Logo principal

**Mise à jour du 3 novembre 2026 :** le logo du site est désormais le logo ANELEC GROUPE, conservé tel que fourni (GROUPE ATC signifie « GROUPE ANELEC TECHNIQUE ET CONCEPTE »). Il remplace la déclinaison avec le lettrage « GROUPE ATC » décrite ci-dessous, qui reste archivée. Dans la version autonome, le logo est dans les en-têtes, les pieds de page et la page Groupe ; dans Squarespace, le logo global téléversé le 29 octobre n’a pas encore été remplacé.

*Historique, 29 octobre 2026 :*

Le lettrage du logo fourni est remplacé par « GROUPE ATC », en conservant les tracés et les trois couleurs du symbole d’origine. Cette demande explicite remplace l’ancienne consigne de ne pas modifier le lettrage ; les fichiers ANELEC originaux restent archivés sans modification.

- **Squarespace :** logo global téléversé dans le contrôle natif Titre du site et logo, puis enregistré. L’image est servie par le CDN Squarespace, son texte alternatif est GROUPE ATC et les hauteurs observées après sauvegarde sont de 48 px sur ordinateur et 40 px sur mobile.
- **Sources autonomes :** le nouveau logo SVG est présent dans les six en-têtes et pieds de page, ainsi que dans la présentation du groupe. PNG transparent disponible pour les éditeurs qui n’acceptent pas le SVG.
- **Archives :** les fichiers originaux restent inchangés. L’image historique native du corps de page Groupe n’est pas le logo principal ; elle reste explicitement identifiée comme ancienne.
- **Palette et périmètre :** les couleurs de la mise en page ne changent pas. Aucun réglage de visibilité, DNS, domaine ou hébergement n’est modifié.
- **Portée de la sauvegarde :** le nouvel en-tête s’applique aussi aux pages déjà activées, conformément à la demande d’afficher ce logo sur le site. Cela ne remplace pas l’accueil, ne change pas la navigation et ne publie pas de nouvelles pages.
- **Recette et dépôt :** onze tests unitaires et douze rendus passent. Les quinze groupes de parcours ont été rejoués après le redéploiement de la même prévisualisation ; les sources du logo et sa configuration native sont synchronisées dans le dépôt GitHub privé dédié.

## Identité et équipe enregistrées

GROUPE ATC est la nouvelle dénomination sociale de la même entreprise auparavant connue comme ANELEC, avec une nouvelle présidence, sans création d’une société ou d’une filiale. La dénomination actuelle et les identifiants ont été recoupés avec l’[Annuaire des Entreprises](https://annuaire-entreprises.data.gouv.fr/entreprise/933108607) et la [fiche Pappers](https://www.pappers.fr/entreprise/anelec-technique-et-concept-933108607).

- **Pages enregistrées :** Mentions légales et À propos, ainsi que les pages hors navigation Accueil, Groupe et Informations ; dix contrôles de vue au total à 1 531 et 409 px.
- **Identifiants :** SAS au capital de 3 000 €, SIREN 933 108 607, SIRET du siège 933 108 607 00021 et TVA FR20933108607 ([Annuaire des Entreprises](https://annuaire-entreprises.data.gouv.fr/entreprise/933108607), [fiche Pappers](https://www.pappers.fr/entreprise/anelec-technique-et-concept-933108607)).
- **Présidence :** Najoua Boughrara est indiquée comme présidente ; aucune attribution automatique du rôle de direction de publication n’est ajoutée ([fiche Pappers](https://www.pappers.fr/entreprise/anelec-technique-et-concept-933108607)).
- **Dates :** inscription Sirene le 21 août 2024 et immatriculation RNE le 8 novembre 2024, sous des libellés distincts ([Annuaire des Entreprises](https://annuaire-entreprises.data.gouv.fr/entreprise/933108607)).
- **Expérience confirmée par l’entreprise :** « Notre directeur des travaux cumule plus de 15 ans d’expérience, et chacun de nos techniciens plus de 10 ans dans son métier. » L’ancienneté des personnes n’est pas attribuée à la société.
- **Nettoyage éditorial :** les identifiants fictifs de la page de mentions et les anciennes références d’À propos à vingt ans d’expérience et à une certification ISO non justifiée sont retirés.
- **Visibilité constatée :** les pages hors navigation Accueil, Groupe et Informations étaient déjà activées. Aucun commutateur n’a été modifié ; les mentions historiques ci-dessous parlant de brouillons désactivés ne décrivent pas cet état actuel.
- **Reste à confirmer :** direction de publication, coordonnées légales complètes de l’hébergeur et modalités du traitement des formulaires avant activation des nouveaux dispositifs.

Les carrousels avec flèches appartiennent à la prévisualisation autonome ; ils ne sont pas installés dans les six blocs image natifs de Services. Aucun transfert Hostinger, changement de DNS, publication Vercel ou envoi de formulaire n’est effectué.

## Services complets et photos

- **Prestations :** Plomberie, Électricité, Serrurerie, Rénovation intérieure, Maçonnerie et Menuiserie. Les quinze tâches détaillées des quatre premières familles sont conservées ; aucun détail non documenté n’est inventé pour les deux autres métiers.
- **Photos :** six blocs image Squarespace natifs, vides et remplaçables depuis l’éditeur. La mention « PHOTO À AJOUTER » disparaît lorsqu’une image est ajoutée. Les visuels génériques précédents ne sont plus affichés.
- **Affichage :** trois colonnes et deux rangées sur ordinateur ; une colonne sur mobile, sans débordement. Les textes, listes, images et formulaire restent natifs ; seul l’agencement de consultation est défini par un CSS spécifique à Services.
- **Sources :** `data/services.json`, `squarespace/native/existing-services.json`, `squarespace/native/services.css` et la page autonome Métiers contiennent la même offre. Les identifiants et trente champs natifs relus sont enregistrés dans le dépôt.
- **Périmètre préservé :** aucun nouveau brouillon activé, aucun envoi de formulaire, aucun changement de domaine ou de DNS, aucun déploiement Hostinger ou Vercel.

## Historique avant relecture complète du PDF

La première correction couvrait la plomberie et les sanitaires, l’électricité, la serrurerie et la rénovation/finitions intérieures. La présente passe ajoute les deux métiers documentés dans le PDF ; les spécialités écartées par l’utilisateur ne sont pas réintroduites et l’offre de maintenance reste une proposition à périmètre écrit.

- **Sources corrigées :** cinq tests automatisés passent ; les douze affichages du site autonome à 375 et 1 440 px et ses six parcours de recette passent, sans erreur JavaScript ni envoi de message.
- **Prévisualisation privée :** mise à jour au même emplacement, puis les douze affichages et six parcours ont été rejoués dans un nouveau contexte navigateur avec le même résultat. Aucun déploiement Hostinger/Vercel ni changement du domaine public.
- **Page Services existante :** titre, introduction, deux encarts métier et paragraphe de demande corrigés, soit huit champs. Les seules activités présentées sont le dépannage et les installations en plomberie/électricité, la serrurerie et la rénovation/finitions intérieures, sans ancienne promesse non confirmée.
- **Source ANELEC :** la présentation fournie confirme la recherche de fuite, les sanitaires, les tableaux électriques et levées de réserves, l’ouverture de porte et le remplacement de serrure, ainsi que peinture, placo, carrelage et bricolage. Les textes exacts et identifiants des champs sont dans `squarespace/native/existing-services.json`.
- **Brouillon Maintenance :** le dernier paragraphe du périmètre est corrigé et enregistré. Il limite explicitement l’offre aux quatre métiers retenus ; le réglage « Activer la page » a été relu décoché après sauvegarde.
- **Contrôle natif :** les deux pages ont été rouvertes après enregistrement ; les anciennes spécialités et anciennes promesses ont disparu des textes. Relevés à 1 154 et 413 px sans débordement horizontal ou texte dépassant sa section ; les coordonnées, la navigation et les formulaires n’ont pas été modifiés.
- **Publication :** la correction ciblée de Services concerne une page existante ; elle ne vaut pas activation des nouveaux brouillons. Aucun bouton Publier, déploiement Hostinger/Vercel, changement DNS ni envoi de formulaire.

Les contrôles natifs généraux détaillés ci-dessous restent ceux de la reprise graphique antérieure. La relecture des deux corrections métier est complémentaire ; elle ne remplace pas les contrôles encore ouverts du menu natif ou d’une transmission réelle de formulaire.

## Réalisé et enregistré

- **Identité :** GROUPE ATC apparaît dans le titre du site, l’en-tête et le pied de page ; l’intitulé complet reste GROUPE ANELEC TECHNIQUE ET CONCEPTE, selon l’orthographe demandée.
- **Courriel :** contact@anelecgroupe.com est enregistré dans les coordonnées, le pied de page et la destination du formulaire. La correction de « aneleggroupe » vers « anelecgroupe » est également appliquée aux sources, documents et pages de la prévisualisation privée.
- **Coordonnées :** 01 84 80 93 85 et 9 RUE DES COLONNES, 75002 PARIS ; le domaine demandé reste anelecgroupe.com.
- **Pied de page :** « Titre de votre site », l’adresse d’exemple et « Conçu avec Squarespace » sont remplacés par la marque, l’intitulé complet, l’adresse postale, le courriel cliquable et le téléphone.
- **Images :** illustration d’architecture sur Accueil avec texte alternatif et légende visible ; logo ANELEC original sur Groupe, présenté comme historique et affiché sans recadrage du signe.
- **Espacements natifs :** lignes inutilisées réduites dans les réglages de section, par les contrôles Squarespace. Les vues bureau/mobile ont ensuite été contrôlées sur les six pages.
- **Styles communs :** les copies répétées de CSS ont été remplacées par une seule version enregistrée par page, comprenant la présentation du bouton du formulaire.

ANELEC est l’ancien nom communiqué par l’entreprise, et non une filiale distincte. Cette identité de marque ne vaut pas vérification d’une modification de dénomination sociale au registre.

## Ajustements du site vitrine

- **Panier :** retiré de l’en-tête.
- **Réservation :** bouton « Réserver » retiré de l’en-tête.
- **Boutique :** déplacée de la navigation principale vers Hors navigation, sans suppression de produits, commandes ou contenus.
- **Anciens contenus :** pages existantes et page Rendez-vous conservées ; aucun effacement de données commerciales.
- **Réalisations futures :** aucune référence fictive affichée ; architecture conservée dans le code, données vides et fonctionnalité désactivée.

La boutique est hors menu, mais pas déclarée désactivée : Squarespace avait refusé cette opération lors de la précédente reprise. La navigation existante conserve Mentions légales, Services, À propos et Contact ; aucune des nouvelles pages n’y a été ajoutée et l’accueil existant n’a pas été remplacé.

## Composition des six pages

Les brouillons se trouvent dans [l’éditeur Squarespace du site existant](https://mandolin-jaguar-flrs.squarespace.com/config/pages). Cet accès nécessite votre session et ne constitue pas une nouvelle adresse publique.

| Page | Adresse du brouillon | Composition enregistrée |
|---|---|---|
| Accueil | `/groupe-atc-accueil` | 4 sections : introduction, besoins et métiers, méthode et territoire, changement de nom et contact. Illustration native à droite sur ordinateur, avec légende non contractuelle. |
| Maintenance | `/groupe-atc-maintenance` | 4 sections : introduction, trois rythmes proposés, périmètre et exclusions, organisation et conditions écrites. |
| Métiers | `/groupe-atc-metiers` | 5 sections : travaux TCE, plomberie, électricité, serrurerie, rénovation intérieure et dépannage qualifié. |
| Groupe | `/groupe-atc-groupe` | 4 sections : présentation, approche, présence francilienne et historique, contact. Logo historique natif dans la partie consacrée au renommage. |
| Contact | `/groupe-atc-contact` | 4 sections : introduction, coordonnées et qualification, demande écrite, formulaire natif. |
| Informations | `/groupe-atc-informations` | 5 sections : cadre de préparation, identité et contacts, mentions et données, visuels et maintenance, statut des brouillons. |

Les contenus utilisent des sections Fluid Engine, des blocs Markdown, des blocs Image et un bloc Form natifs, pas un site entier collé dans un bloc HTML. Les appels à l’action dans les textes sont des liens mis en forme ; les styles propres aux pages associent bleu nuit, blanc minéral et accent bleu, indépendamment des couleurs des pièces ANELEC.

## Formulaire : configuration corrigée et relue

Le bloc « GROUPE ATC | Demande technique » est présent sur Contact. La destination contact@anelecgroupe.com a été relue dans son éditeur ; les champs et l’intitulé « Site et commune » ont été retrouvés après avoir quitté Contact, ouvert Groupe et rouvert Contact.

- **Nom :** prénom et nom de famille obligatoires.
- **Courriel professionnel :** champ de réponse obligatoire ; aucune restriction de domaine professionnel n’a été ajoutée.
- **Site et commune :** obligatoire, avec une aide acceptant logement, commerce, bureaux ou copropriété ; le nom de l’entreprise n’est demandé que s’il est utile.
- **Votre besoin :** obligatoire, avec une aide sur les équipements, contraintes et calendrier ; rappel de ne pas fournir de données sensibles.
- **Téléphone :** facultatif.
- **Nature de la demande :** choix obligatoire, avec six prestations corrigées et retrouvées dans la liste rendue après fermeture de l’éditeur, passage sur Groupe et réouverture de Contact.

### Liste corrigée, constatée après réouverture

| Position après « Choisir une prestation » | Valeur observée |
|---|---|
| 1 | Maintenance Essentiel : 2 visites par an |
| 2 | Maintenance Suivi : 4 visites par an |
| 3 | Maintenance Continuité : 12 visites par an |
| 4 | Maintenance : périmètre à définir |
| 5 | Travaux TCE |
| 6 | Intervention ponctuelle |

Les anciennes options génériques ont été remplacées en modifiant les champs existants, sans recréer le formulaire ni ajouter d’options. La liste correcte a été relue dans la page rendue ; ce contrôle confirme la persistance de ces valeurs.

L’inscription aux e-mails a été retrouvée décochée dans les réglages du champ Courriel professionnel. Le message post-envoi a également été relu dans son éditeur :

> Merci, votre demande a bien été transmise à GROUPE ATC. Nous reviendrons vers vous après étude. Cet envoi ne vaut ni commande, ni devis accepté, ni confirmation d’intervention. Pour une urgence présentant un danger, contactez les services de secours compétents.

Cette lecture du paramétrage n’est pas un test de transmission. Aucun formulaire n’a été envoyé, aucun courriel de test n’a été transmis et la réception réelle n’a pas été contrôlée.

## Contrôles réalisés et limites

### Dans Squarespace

- **Enregistrements :** les six compositions ont été sauvegardées et quittées ; Contact et Informations ne sont plus des reprises non confirmées.
- **En-tête :** un débordement horizontal a été corrigé par le dimensionnement de son conteneur ; Contact a ensuite été observé avec une largeur de document et de défilement de 1154 px.
- **Accueil :** premier contrôle au bureau à 1154 px et en vue mobile à 413 px, sans ancien courriel, texte générique de pied de page ni chevauchement mesuré. Ce contrôle a révélé une illustration trop aplatie.
- **Correction de l’illustration :** hauteur réajustée dans la grille native et enregistrée ; après harmonisation finale, hauteur observée d’environ 468 px au bureau et 199 px sur mobile, au lieu des 23 px du contrôle initial.
- **Logo historique :** image native chargée, texte alternatif saisi et option Ajuster vérifiée ; son cadre a ensuite été agrandi et sauvegardé sans recadrer le signe.
- **Désactivation :** Maintenance a été remis en état désactivé, puis son réglage a été relu après sauvegarde. Les cinq autres réglages de page n’ont pas été relus dans cette dernière passe ; aucune nouvelle page n’a été activée.

Les nouveaux relevés `native-final-*.json` et les captures de cette dernière reprise couvrent les six pages à 1 154 px au bureau et 413 px dans la vue téléphone native. Ils montrent un seul H1 par page, les nombres de sections attendus, aucune ancienne adresse électronique, aucun pied de page générique, aucun débordement horizontal ou chevauchement de blocs détecté, ainsi que les images chargées avec leurs textes alternatifs.

Les six choix du formulaire ont aussi été sélectionnés au clavier ; une saisie locale de 2 040 caractères a été contrôlée à 413 px sans débordement, puis effacée en quittant et rouvrant Contact. Les liens Accueil → Maintenance → Contact → Métiers ont ouvert les bons contenus dans la prévisualisation authentifiée, sans activation des pages.

Des copies DOM natives, débarrassées des scripts et conservées hors du site public, ont été vérifiées à 375 et 1 440 px avec Playwright. Les douze rendus n’ont montré ni débordement horizontal ni texte dépassant sa section ; ce contrôle complémentaire ne prouve pas les scripts natifs, le menu ou la transmission d’un formulaire.

Le menu mobile natif n’a pas pu être validé : son ouverture dans l’éditeur n’a pas été confirmée, puis le passage en aperçu plein écran et le contrôle direct à 375 px ont rencontré un blocage de Comet. La simulation de dimensions a été retirée avec succès et le contrôle du navigateur a été arrêté ; aucune réussite de ce test n’est revendiquée.

### Prévisualisation privée distincte

La prévisualisation privée, corrigée avec contact@anelecgroupe.com, avait déjà été contrôlée sur six pages à 1440 × 1000 et 375 × 812. Ses parcours de menu, accordéons, choix des formules, préparation locale d’une demande et récapitulatif avaient été testés sans envoi externe ; ces résultats ne valident pas le formulaire Squarespace.

Les quatre tests automatisés locaux passent lors de cette reprise. Les deux versions restent distinctes et ne doivent pas être confondues ; le dépôt garde les sources autonomes pour votre hébergement Hostinger futur.

## Limites de réception restantes

- **Menu visiteur :** vérifier son cycle d’ouverture/fermeture dans le contexte natif réel après rétablissement de Comet. Ce contrôle n’est pas remplacé par les copies DOM sans scripts.
- **Transmission :** la configuration du formulaire est relue et la saisie locale est testée, mais aucun envoi ni réception de message n’a été vérifié.
- **Périmètre :** les contrôles d’affichage ne sont ni un audit exhaustif d’accessibilité, ni un audit de la console et des scripts tiers de Squarespace.

Les six pages et le formulaire existants doivent être conservés. Il ne faut ni recréer ces pages ni ajouter à nouveau les choix ou le bloc de formulaire.

## GitHub et déploiement Hostinger différé

Le nouveau dépôt [groupe-atc-squarespace](https://github.com/zehair-louzza/groupe-atc-squarespace) est privé et sa branche `main` contient les sources du site, les éléments natifs et la documentation. Les dépôts précédents n’ont pas été modifiés.

Votre consigne est un déploiement sur Hostinger plus tard. Le dossier `site/` est la version autonome à utiliser ; les blocs natifs Squarespace ne sont pas automatiquement exportés dans ce dossier et le formulaire autonome reste un récapitulatif local, sans réception serveur.

La procédure différée et les validations de lancement figurent dans `docs/deploiement-hostinger.md`. Aucun transfert Hostinger ni changement du domaine `anelecgroupe.com` n’a été exécuté.

## Conditions avant une ouverture publique

- **Juridique :** compléter l’entité éditrice, l’immatriculation, les mentions obligatoires, la confidentialité, les destinataires et modalités de conservation des données.
- **Offre :** valider les moyens, l’inventaire, les prix et conditions particulières avant de transformer les propositions en contrats.
- **Test réel :** obtenir une autorisation distincte pour envoyer une demande fictive et vérifier sa réception.
- **Mise en ligne :** obtenir un accord distinct pour activer les pages, remplacer l’accueil et la navigation, et définir les éventuelles redirections.

Les rythmes Essentiel, Suivi et Continuité restent des propositions de 2, 4 et 12 visites par an, sur une base d’un site, un technicien et deux heures maximum sur place par visite. Aucun tarif, astreinte permanente ou délai d’intervention garanti n’est inventé.

Aucun bouton de publication n’a été utilisé. Aucun DNS, domaine ou abonnement n’a été modifié, aucun déploiement Vercel ou Hostinger n’a été lancé ; seul le nouveau dépôt GitHub privé a reçu les sources selon votre demande, sans modification des dépôts existants.
