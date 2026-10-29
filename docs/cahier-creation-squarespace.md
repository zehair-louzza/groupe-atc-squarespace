# GROUPE ATC : cahier de création du nouveau site Squarespace

Version actualisée le 29 octobre 2026 après la mise en forme des six brouillons natifs et votre demande d’un dépôt GitHub avec hébergement Hostinger ultérieur. Ce dossier réunit le positionnement, l’architecture, les textes, une direction graphique indépendante des anciennes couleurs et les instructions de réalisation dans le site Squarespace existant, sans confondre cette version native avec les sources autonomes.

## Décision de conception

La page Services reprend les six familles documentées dans les pièces ANELEC : plomberie, électricité, serrurerie, rénovation intérieure, maçonnerie et menuiserie. Les deux derniers métiers sont expressément nommés page 2 du PDF ; leur omission lors de la première passe est corrigée sans inventer de sous-prestations. La page est enregistrée dans Squarespace avec les listes détaillées et six blocs image natifs à compléter.

Votre dernière demande est appliquée à l’affichage de consultation : trois services par ligne sur ordinateur, soit deux lignes pour les six familles, et une colonne sur mobile. Les emplacements indiquent « PHOTO À AJOUTER » jusqu’à l’insertion de vos images. L’offre récurrente et les conditions restent des propositions distinctes à valider ; le brouillon Maintenance n’est pas activé.

Le nouveau site présente **GROUPE ATC**, développé exactement en « GROUPE ANELEC TECHNIQUE ET CONCEPTE ». Vous avez confirmé qu’il s’agit de la même société qu’ANELEC, dont la dénomination sociale est devenue GROUPE ATC, avec une nouvelle présidence, sans création d’entreprise ou de filiale et en conservant `anelecgroupe.com` ; le registre confirme la dénomination sociale actuelle ([Annuaire des Entreprises](https://annuaire-entreprises.data.gouv.fr/entreprise/933108607)).

Les informations légales fournies sont désormais renseignées : SAS au capital de 3 000 €, SIREN 933 108 607, SIRET du siège 933 108 607 00021, TVA FR20933108607, code APE 41.20B et présidente Najoua Boughrara ; les inscriptions Sirene du 21 août 2024 et RNE du 8 novembre 2024 restent distinguées ([Annuaire des Entreprises](https://annuaire-entreprises.data.gouv.fr/entreprise/933108607), [fiche Pappers](https://www.pappers.fr/entreprise/anelec-technique-et-concept-933108607)).

Vous avez confirmé que vos techniciens et votre directeur de travaux disposent de plus de 10 ans d’expérience dans leur domaine. Cette expérience des personnes est mise en avant sans l’attribuer à l’ancienneté de la société ; les références à vingt ans d’expérience et à une certification ISO non justifiée sont retirées d’À propos.

Les pages existantes Mentions légales et À propos et les pages hors navigation Accueil, Groupe et Informations ont été mises à jour. Les trois pages hors navigation contrôlées étaient déjà activées ; leur état a été conservé, sans les présenter comme des brouillons désactivés.

Les coordonnées confirmées sont `+33184809385`, `contact@anelecgroupe.com` et `9 RUE DES COLONNES, 75002 PARIS`. L’utilisateur a corrigé explicitement l’ancienne saisie du courriel ; le domaine de messagerie correspond à celui du site.

La recommandation est un site vitrine natif Squarespace 7.1, administrable dans Fluid Engine, et non la conversion intégrale d’un projet React en un grand bloc de code. Fluid Engine est l’éditeur principal de la version 7.1 ; le dispositif historique Developer Platform et son accès aux fichiers de modèles concernent la version 7.0, pas la création de modèles 7.1 ([documentation Fluid Engine](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine), [limites de Developer Platform](https://support.squarespace.com/hc/en-us/articles/206545717-Squarespace-Developer-Platform-FAQ)).

### Évolution demandée : GitHub et Hostinger

Un nouveau dépôt privé dédié, [groupe-atc-squarespace](https://github.com/zehair-louzza/groupe-atc-squarespace), a été créé et alimenté sur sa branche `main`, sans modifier les dépôts existants. Il conserve la version autonome dans `site/` ainsi que les éléments natifs Squarespace ; vous avez demandé de déployer sur Hostinger plus tard, pas maintenant.

La migration prévue utilisera les sources autonomes, pas un export automatique des blocs Fluid Engine. Le formulaire autonome reste un récapitulatif local à raccorder à un traitement réel avant lancement ; aucun transfert, changement de DNS ni déploiement Hostinger n’a été exécuté.

### Objectifs du site

- **Compréhension immédiate :** permettre au visiteur d’identifier les prestations et la zone d’intervention dès le premier écran.
- **Demandes qualifiées :** distinguer dépannage ponctuel, travaux et besoin de suivi technique.
- **Crédibilité :** présenter des métiers précis, une méthode de travail et des preuves réellement attribuables à l’entité concernée.
- **Autonomie :** rendre les textes, images, pages métiers et formulaires faciles à modifier.
- **Évolutivité :** prévoir l’ajout de réalisations et, une fois définie, d’une offre contractuelle de maintenance.

### Ce qui est retenu de B3T

L’analyse B3T apporte une logique utile : une entrée par le besoin du client, des pages métiers, une méthode d’intervention, des références et un accès clair au contact. En revanche, les engagements d’astreinte permanente, d’intervention sous quatre heures ou de GMAO publiés par B3T ne doivent pas être attribués à GROUPE ATC sans justification propre ([offre B3T examinée](https://www.b3t.fr/maintenance-multitechnique/)).

| Principe de départ | Adaptation GROUPE ATC |
|---|---|
| Trois métiers principaux chez B3T | Trois besoins de navigation proposés : entretenir, dépanner, rénover. |
| Travaux sous la bannière contractant général | Employer « Travaux TCE et rénovation intérieure » ; ne pas revendiquer un statut de contractant général sans validation. |
| Maintenance décrite par une méthode | Détailler d’abord les métiers réellement documentés, puis le déroulement d’une intervention. |
| Références de chantiers | Publier uniquement les opérations identifiées, attribuables et autorisées. |
| Identité visuelle propre au concurrent | Concevoir une direction originale pour GROUPE ATC. |
| WordPress, Divi et extensions | Utiliser les pages et blocs natifs Squarespace ; réserver le code aux ajustements justifiés. |

## Base de contenu issue des pièces ANELEC

Les constats de cette section proviennent de `PRESENTATION-ANELEC.png` et du PDF `01022026-2.pdf`, dont les sept pages ont été examinées. Ils décrivent ce que les documents affirment, sans constituer une vérification indépendante des références, de l’ancienneté ou des qualifications.

### Prestations documentées

| Domaine | Prestations présentes dans les pièces | Traitement dans le futur site |
|---|---|---|
| Plomberie | Dépannage, recherche de fuite, installation sanitaire, mise en sécurité. | Page métier dédiée et entrée dans les demandes de dépannage. |
| Électricité | Dépannage, installation, tableau électrique, levée de réserves. | Page métier dédiée ; préciser les limites du périmètre technique. |
| Serrurerie | Ouverture de porte, remplacement de serrure, mise en sécurité. | Page métier dédiée avec appel au contact. |
| Rénovation intérieure | Peinture, plaques de plâtre, carrelage, petits travaux. | Page métier et page transversale Travaux TCE. |
| Maçonnerie et menuiserie | Métiers cités dans la présentation générale du PDF, sans détail d’exécution. | Mention secondaire, sur étude, après précision des travaux proposés. |
| Organisation | Équipe dédiée, planification et rapport détaillé en fin d’intervention. | Base de la rubrique « Notre méthode », à confirmer pour GROUPE ATC. |
| Public et territoire | Particuliers et professionnels en Île-de-France. | Deux parcours clients, sans inventer d’agences ou de références sectorielles. |

### Informations à ne pas transférer automatiquement

| Élément des documents | Point de vigilance | Décision de rédaction |
|---|---|---|
| Nom ANELEC GROUPE | Le simple renommage en GROUPE ATC est confirmé. | Écrire « ANELEC devient GROUPE ATC », sans filiale ni organigramme inventés. |
| Plus de dix ans d’expérience en maintenance | Cela ne prouve pas que GROUPE ATC existe depuis plus de dix ans. | Préférer une formulation qualitative ; réserver le chiffre à une attribution précise et justifiable. |
| Plus de cinq ans d’expérience par technicien | Affirmation documentaire non vérifiée individuellement. | Ne pas en faire une promesse générale du nouveau site sans validation. |
| Logos de références | Le PNG affiche notamment Auchan, Carrefour, Végézi, Alésia et Levallois-Perret. | Ne pas les republier comme clients directs de GROUPE ATC avant vérification de la relation et des droits d’usage. |
| Déplacement à 40 € | Conditions fiscales, géographiques et majorations non détaillées. | Ne pas afficher ce prix en lancement sans barème complet validé. |
| Main-d’œuvre à 42 € | Aucune unité de facturation explicite ; HT ou TTC non précisé. | Ne surtout pas transformer la mention en « 42 €/h » par supposition. |
| Courriel | Votre correction explicite confirme `contact@anelecgroupe.com`. | Utiliser cette adresse dans tous les contenus et dans la configuration de réception. |
| Adresse | Vous confirmez `9 RUE DES COLONNES, 75002 PARIS`. | Utiliser cette adresse postale, sans annoncer d’accueil du public sans rendez-vous. |
| Téléphone | Vous confirmez `+33184809385`. | Afficher 01 84 80 93 85 ; les horaires de prise d’appel restent à définir. |
| Dates du PDF | Couverture datée du 25 février 2026 ; pieds de page portant « May 28, 2038 ». | Supprimer ces dates de gabarit ; ne pas les interpréter comme historique de l’entreprise. |

Cette vérification évite de construire le nouveau site comme un simple remplacement de logo sur une plaquette existante. La marque, les coordonnées, les preuves et les engagements doivent former un ensemble cohérent.

## Positionnement et ligne éditoriale

### Proposition centrale

Le positionnement recommandé est celui d’un interlocuteur pour les besoins courants du bâtiment, du dépannage à la rénovation, avec une organisation lisible et un suivi des interventions. L’expression « groupe » est conservée dans la marque demandée, mais aucune holding, filiale, agence ou implantation supplémentaire n’est supposée.

Proposition de titre principal :

> Maintenance multitechnique et travaux TCE en Île-de-France.

Proposition de texte d’introduction :

> Plomberie, électricité, serrurerie et rénovation intérieure : GROUPE ATC vous accompagne pour entretenir, remettre en état et faire évoluer vos espaces. Professionnels et particuliers, présentez-nous votre besoin pour définir une intervention adaptée.

Ces textes sont une base rédactionnelle à valider avant publication. Ils reprennent les domaines documentés sans annoncer de disponibilité permanente, de délai garanti ou de capacité technique non établie.

### Publics et parcours

- **Professionnels :** mettre en avant la coordination des demandes, la planification et le suivi ; les gestionnaires, commerces et entreprises constituent des cibles proposées, pas une liste de clients acquis.
- **Particuliers :** faciliter l’accès aux métiers, à la rénovation intérieure et à la demande de dépannage.
- **Gestionnaires multisites :** prévoir une question sur le nombre de sites dans le formulaire, sans annoncer d’offre multisite nationale ou de GMAO non confirmée.

Le ton doit être concret, professionnel et accessible. Éviter les superlatifs, les acronymes sans explication et les promesses telles que « zéro panne », « intervention immédiate », « meilleur prix » ou « tous travaux sans limite ».

## Arborescence proposée

### Navigation principale

La version de lancement regroupe le contenu en six pages, avec cinq accès dans l’en-tête dont le contact mis en avant. Les métiers et le dépannage sont regroupés pour éviter un menu trop long ; le programme étendu reste disponible comme évolution ultérieure.

```text
GROUPE ATC
├── Accueil
├── Maintenance
│   ├── Trois formules proposées
│   └── Périmètre et conditions
├── Travaux & métiers
│   ├── Plomberie, électricité, serrurerie
│   ├── Rénovation intérieure
│   └── Dépannage
├── Le groupe
└── Contact

Accès permanent :
└── Parlons de votre projet → page Contact

À activer après validation des contenus :
└── Nos réalisations
    └── Une fiche par opération documentée

Pied de page :
├── Informations & confidentialité, à finaliser avant publication
├── Maintenance, métiers et présentation du groupe
└── Coordonnées communiquées
```

### Pages créées et adresses des brouillons

Les six pages ci-dessous sont maintenant créées dans l’éditeur Squarespace existant, hors navigation et désactivées. Le préfixe `/groupe-atc-` évite de remplacer les pages et adresses existantes ; ces adresses de brouillon ne constituent pas une décision de redirection ou de mise en ligne.

| Page créée | Adresse du brouillon Squarespace | Contenu enregistré |
|---|---|---|
| GROUPE ATC \| Accueil | `/groupe-atc-accueil` | Offre, besoins, métiers, méthode et territoire. |
| GROUPE ATC \| Maintenance | `/groupe-atc-maintenance` | Essentiel, Suivi, Continuité, périmètre et conditions proposées. |
| GROUPE ATC \| Métiers | `/groupe-atc-metiers` | Quatre métiers et rubrique dépannage. |
| GROUPE ATC \| Groupe | `/groupe-atc-groupe` | Intitulé complet, renommage et présentation. |
| GROUPE ATC \| Contact | `/groupe-atc-contact` | Coordonnées et formulaire natif préparé, avec réception configurée à contact@anelecgroupe.com ; page désactivée. |
| GROUPE ATC \| Informations | `/groupe-atc-informations` | Cadre de préparation, mentions et données à compléter avant ouverture publique. |

Les six compositions enregistrées représentent vingt-six sections Fluid Engine : Accueil 4, Maintenance 4, Métiers 5, Groupe 4, Contact 4 et Informations 5. Les textes sont dans des blocs Markdown natifs ; l’illustration d’accueil, le logo historique et le formulaire utilisent leurs blocs Squarespace dédiés. Les appels à l’action des contenus sont des liens mis en forme par CSS. La prévisualisation privée conserve ses fichiers `.html` et reste distincte des pages natives ; le domaine final demandé reste `anelecgroupe.com`.

### Évolutions possibles de l’arborescence

Les pages spécialisées suivantes restent des pistes pour une seconde étape, pas des pages supplémentaires déjà réalisées. Leur création dépendra de contenus et de visuels suffisamment distincts.

| Page | Adresse proposée | Rôle |
|---|---|---|
| Accueil | `/` | Résumer l’offre et orienter vers le bon besoin. |
| Maintenance multitechnique | `/maintenance-multitechnique` | Expliquer les domaines, le suivi et les modalités à définir. |
| Dépannage | `/depannage` | Qualifier une panne ou une remise en sécurité, sans délai fictif. |
| Travaux TCE | `/travaux-tce-renovation` | Présenter la rénovation et l’articulation des métiers. |
| Plomberie | `/plomberie` | Détailler les interventions documentées. |
| Électricité | `/electricite` | Détailler dépannage, installation et tableau. |
| Serrurerie | `/serrurerie` | Détailler accès, serrures et mise en sécurité. |
| Rénovation intérieure | `/renovation-interieure` | Peinture, plaques de plâtre, carrelage et travaux associés. |
| Maçonnerie | `/maconnerie` | Métier documenté page 2 du PDF ; périmètre à définir après étude. |
| Menuiserie | `/menuiserie` | Métier documenté page 2 du PDF ; périmètre à définir après étude. |
| Le groupe | `/groupe-atc` | Présenter l’organisation réelle, sans organigramme inventé. |
| Zone d’intervention | `/ile-de-france` | Définir les conditions de couverture locale. |
| Contact | `/contact` | Recueillir une demande qualifiée. |
| Réalisations | `/realisations` | À publier seulement lorsque des cas validés sont disponibles. |

Pour le lancement compact retenu, les six familles sont réunies sur la page Services, à raison de trois par ligne sur ordinateur. Les éventuelles pages métier du tableau sont des évolutions possibles, pas des pages supplémentaires créées ou activées lors de cette passe.

## Composition de la page d’accueil

L’accueil doit raconter une progression simple : ce que fait GROUPE ATC, le besoin du visiteur, les métiers concernés, la méthode, les preuves disponibles et le contact. La mise en page reste réalisable avec des sections natives, des blocs de texte, d’image et de bouton dans Fluid Engine ([éditeur Squarespace 7.1](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine)).

| Section | Contenu et composition | Action attendue |
|---|---|---|
| En-tête | Nom typographique GROUPE ATC, navigation et accès au contact ; numéro confirmé disponible sur la page Contact. | Accéder au bon parcours sans recherche. |
| Premier écran | Titre principal, introduction courte, photographie réelle ou illustration clairement non documentaire. | « Présenter mon projet ». |
| Trois besoins | Entretenir ; dépanner ; rénover, avec une phrase chacun. | Aller vers une page d’expertise. |
| Quatre métiers | Plomberie, électricité, serrurerie, rénovation intérieure. | Consulter le périmètre concret. |
| Notre méthode | Qualification, diagnostic, proposition, intervention, compte rendu. | Comprendre la prise en charge. |
| Professionnels et particuliers | Deux textes courts adaptés aux besoins de chacun. | Décrire son contexte. |
| Preuves | Cas de réalisation et témoignages validés ; section absente si les preuves manquent. | Évaluer une expérience comparable. |
| Territoire | Île-de-France et modalités d’intervention à préciser selon la localisation. | Indiquer la commune du projet. |
| Questions fréquentes | Devis, métiers, pièces à transmettre, suivi, zone. | Réduire les demandes imprécises. |
| Contact final | Invitation à décrire le besoin, avec un accès au formulaire. | Envoyer une demande. |

### Textes proposés pour les trois besoins

- **Entretenir vos espaces :** identifier les besoins d’entretien, organiser les interventions utiles et suivre les actions réalisées. Le périmètre de suivi est défini selon les équipements et les usages du site.
- **Dépanner et remettre en sécurité :** décrire une panne de plomberie, d’électricité ou de serrurerie pour préparer une prise en charge adaptée. Les modalités d’intervention sont confirmées après qualification.
- **Rénover et aménager :** associer les métiers nécessaires à un projet de rénovation intérieure. Les travaux, les étapes et les conditions d’exécution sont précisés dans la proposition.

Ces formulations décrivent une organisation souhaitée sans transformer un engagement commercial en garantie automatique. Les modalités doivent correspondre aux moyens effectivement disponibles.

## Contenu des pages d’expertise

### Maintenance multitechnique

Titre proposé : « Un suivi technique adapté à vos locaux ». Vous confirmez qu’aucune offre récurrente n’existe encore ; une proposition distincte a donc été préparée avec visites, périmètre et conditions écrites.

Texte de départ :

> Les besoins d’entretien d’un bâtiment concernent souvent plusieurs métiers. GROUPE ATC vous aide à qualifier les demandes en plomberie, électricité, serrurerie et entretien intérieur pour organiser les interventions adaptées.
>
> Une intervention ponctuelle et un suivi récurrent ne répondent pas au même besoin. Le périmètre, les fréquences, les modalités de compte rendu et les conditions de dépannage doivent être définis avant le démarrage.

La page doit ensuite présenter :

- **Équipements concernés :** liste réelle, avec inclusions et exclusions.
- **Diagnostic initial :** contenu proposé et livrables, si cette prestation est effectivement disponible.
- **Préventif :** opérations et périodicités uniquement après définition de l’offre.
- **Correctif :** qualification, devis, intervention et suivi.
- **Traçabilité :** nature du compte rendu, supports et destinataires.
- **Conditions :** horaires, déplacement, fournitures, pièces et prestations hors forfait.

Les formules proposées sont Essentiel, avec deux visites annuelles, Suivi, avec quatre visites, et Continuité, avec douze visites, sur une base d’un site, d’un technicien et de deux heures par passage. Elles restent des propositions non activées, à chiffrer après audit ; aucun tarif ni engagement de disponibilité n’est inventé.

### Dépannage et remise en sécurité

Titre proposé : « Un besoin de dépannage ? Décrivons la situation ». Cette page doit aider le visiteur à transmettre les bonnes informations, sans présenter le site comme un service d’urgence permanent.

Texte de départ :

> Une fuite, un dysfonctionnement électrique ou un problème d’accès nécessite d’abord une description précise. Indiquez la commune, le métier concerné et les symptômes constatés pour nous permettre d’étudier votre demande.
>
> L’intervention est organisée selon la nature du problème, la disponibilité et les conditions d’accès. Aucun délai garanti ne doit être annoncé avant sa confirmation.

La page peut proposer un appel au numéro confirmé, 01 84 80 93 85, et un formulaire court. Les horaires de réponse doivent être définis ; la formule « 24 h/24 et 7 j/7 » est exclue tant qu’une astreinte réelle n’est pas confirmée.

### Travaux TCE et rénovation

Titre proposé : « Des travaux cohérents, du besoin aux finitions ». L’objectif est de présenter uniquement la complémentarité de la plomberie, de l’électricité, de la serrurerie et de la rénovation/finitions intérieures, sans promettre d’études d’architecture ni de gros œuvre complet.

Texte de départ :

> Rénover un espace peut mobiliser plusieurs métiers : plomberie, électricité, peinture, plaques de plâtre ou carrelage. GROUPE ATC étudie votre besoin pour définir les travaux et leurs conditions de réalisation.
>
> La proposition précise les prestations retenues, les étapes et les limites de l’intervention. Les travaux de maçonnerie et de menuiserie sont à détailler selon le projet.

Le parcours proposé est : échange initial, visite si nécessaire, définition du périmètre, devis, planification, exécution et compte rendu. Il s’agit d’un processus à faire valider par l’équipe, pas d’une procédure déjà auditée.

## Contenu des pages métiers

Chaque page métier doit suivre le même gabarit : un titre, une introduction, les interventions, les limites du périmètre, le déroulement et un bouton de contact. Les textes suivants sont volontairement sobres et fondés sur les prestations mentionnées dans les pièces.

| Métier | Texte de départ | Interventions à détailler |
|---|---|---|
| Plomberie | « Dépannage, recherche de fuite et travaux sanitaires : présentez votre besoin pour définir l’intervention et les éventuels travaux de remise en état. » | Dépannage ; recherche de fuite ; installation sanitaire ; mise en sécurité. |
| Électricité | « Installation, dépannage ou adaptation d’un tableau électrique : nous étudions la demande et les travaux nécessaires selon le périmètre retenu. » | Dépannage ; installation ; tableau ; levée de réserves dans les limites des compétences et justificatifs disponibles. |
| Serrurerie | « Un problème d’accès ou une serrure à remplacer ? Décrivez la situation pour préparer une intervention adaptée. » | Ouverture de porte ; remplacement de serrure ; mise en sécurité. |
| Rénovation intérieure | « Peinture, plaques de plâtre et carrelage : des travaux à définir selon l’état des lieux et le résultat recherché. » | Préparation des supports à préciser ; peinture ; plaques de plâtre ; carrelage ; travaux complémentaires validés. |

Éviter les spécialités ajoutées par extrapolation : recherche de fuite non destructive, haute tension, désamiantage, portes blindées certifiées, toiture ou structure porteuse ne figurent pas dans le périmètre détaillé des documents. Les pages doivent rester proportionnées aux moyens et assurances de l’entreprise.

## Présentation du groupe, territoire et références

### Page « Le groupe »

La page doit expliquer la vocation de GROUPE ATC, son organisation opérationnelle et les modalités de suivi. Elle ne doit pas raconter une histoire de création ou afficher des chiffres d’effectifs non confirmés.

Texte proposé :

> GROUPE ATC signifie GROUPE ANELEC TECHNIQUE ET CONCEPTE. ANELEC devient GROUPE ATC pour présenter son offre d’entretien, de dépannage et de rénovation des bâtiments en Île-de-France.
>
> Chaque besoin appelle un périmètre adapté. Nous privilégions une description précise des travaux, une planification convenue et une restitution des actions réalisées.

Le second paragraphe constitue un engagement éditorial proposé, à valider opérationnellement. La relation est désormais claire : un renommage, sans filiale nouvelle ; les mentions légales devront néanmoins identifier précisément l’entité juridique éditrice.

### Page « Île-de-France »

Le texte de départ peut reprendre la couverture régionale des documents ANELEC, sous réserve de validation pour GROUPE ATC. Il doit inviter à préciser la commune et les contraintes d’accès plutôt qu’affirmer une présence permanente dans chaque département.

Texte proposé :

> Vous avez un besoin de dépannage, d’entretien ou de rénovation en Île-de-France ? Indiquez la commune, le type de bâtiment et le métier concerné.
>
> La faisabilité, les conditions de déplacement et les modalités d’intervention sont confirmées après étude de la demande.

Ne pas créer de fausses agences locales ou de pages répétitives par ville pour donner une impression de couverture. Des pages locales ne sont utiles que si elles apportent des informations distinctes et vérifiables.

### Réalisations et références

Vous confirmez que les chantiers seront ajoutés ultérieurement. Leur architecture est conservée dans le code, avec une liste vide, un schéma de données et un indicateur de publication désactivé ; aucune réalisation fictive n’est créée.

Les deux logos fournis portent toujours ANELEC et sont conservés sans modification, comme actifs historiques. Les photographies de la plaquette ne sont pas requalifiées en chantiers ; les visuels de la prévisualisation sont des illustrations identifiées comme telles.

Une fiche validée comprendra le lieu à une précision appropriée, le besoin, les travaux réellement réalisés, les photographies autorisées et le nom de l’entité intervenante. Si un chantier a été réalisé sous le nom ANELEC, cette attribution historique restera explicite dans le contexte du renommage confirmé.

## Nouvelle direction graphique

### Concept proposé : précision technique et sobriété architecturale

La direction ne reprend ni le trio vert, jaune et rouge, ni les découpes circulaires de la plaquette. Elle privilégie des fonds clairs, du bleu nuit, un accent cobalt, des lignes nettes et une photographie de terrain.

| Rôle | Couleur proposée | Usage |
|---|---|---|
| Bleu nuit | `#142536` | Titres, pied de page et sections institutionnelles. |
| Blanc minéral | `#F4F5F3` | Fond principal. |
| Blanc | `#FFFFFF` | Zones de lecture et formulaires. |
| Cobalt | `#264ED8` | Boutons et liens principaux. |
| Gris ardoise | `#5C6670` | Texte secondaire. |
| Gris de séparation | `#DDE2E5` | Filets, champs et séparations. |

Cette palette est une proposition, pas une identité définitivement approuvée. Les contrastes devront être contrôlés dans les états réels des boutons, liens et formulaires.

### Typographie et mise en page

- **Titres :** une sans-sérif structurée, par exemple Archivo si disponible dans le catalogue de l’éditeur.
- **Lecture :** une sans-sérif sobre, par exemple Source Sans 3, ou une famille native de caractéristiques proches.
- **Composition :** alternance de texte et de photographie, lignes de séparation fines, grilles simples ; pas d’accumulation de cartes arrondies.
- **Marque :** utiliser le nom typographique GROUPE ATC et son intitulé complet dans la présentation ; conserver le logo ANELEC fourni, sans modification, avec une attribution historique.
- **Images :** privilégier des photographies originales autorisées ; une image d’illustration ne doit jamais être présentée comme une réalisation ou un membre de l’équipe.
- **Mouvement :** apparitions discrètes si nécessaires, sans animation obligatoire pour lire ou utiliser le site.

### Version mobile

La hiérarchie doit placer le métier, la zone et l’action principale avant les détails. Le téléphone validé et le bouton de contact doivent être accessibles sans qu’une barre fixe masque le contenu.

Fluid Engine permet d’ajuster la disposition mobile indépendamment du bureau, mais les changements de contenu peuvent affecter les deux vues. Chaque ajout ou modification doit donc être vérifié sur mobile et sur ordinateur ([dispositions mobiles Fluid Engine](https://support.squarespace.com/hc/en-us/articles/46306741295757-Design-mobile-page-layouts-in-Fluid-Engine)).

## Réalisation native dans Squarespace

### Principes d’intégration

Les textes doivent être saisis dans de vrais blocs éditables, et non déposés sous forme d’images contenant du texte. Le choix proposé de blocs natifs réduit la dépendance à du code spécifique et permet de conserver une édition accessible dans Fluid Engine ([documentation de l’éditeur](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine)).

| Besoin | Solution retenue pour la conception |
|---|---|
| Mise en page | Sections Fluid Engine, avec vérification séparée des dispositions bureau et mobile. |
| Titres et contenus | Blocs de texte, niveaux de titre cohérents, un titre principal par page. |
| Navigation et conversion | Navigation du site, boutons et liens vers les pages de contact. |
| Visuels | Blocs d’image et compositions simples, avec légendes lorsque l’attribution l’exige. |
| Demande de devis | Bloc Form, champs adaptés et stockage configuré. |
| Questions fréquentes | Blocs natifs disponibles dans l’éditeur ou texte structuré ; éviter un composant JavaScript indispensable. |
| Ajustements graphiques | Styles globaux d’abord, CSS limité ensuite si nécessaire. |
| Intégrations externes | Uniquement pour un besoin défini, après vérification du forfait et des conditions de données. |

Les blocs de code acceptent du HTML et du CSS ; l’exécution de JavaScript dépend du forfait. La documentation examinée ne décrit pas une conversion automatique d’un site React externe en pages Squarespace natives : le projet doit être reconstruit avec les composants éditables retenus ([blocs de code Squarespace](https://support.squarespace.com/hc/en-us/articles/206543167-Code-blocks)).

### Rôle de GitHub et Vercel

GitHub peut servir à versionner le cahier de création, les textes validés et les éventuels compléments CSS/JavaScript. Il ne faut pas confondre cet usage avec un déploiement automatique des pages Fluid Engine ; l’accès Git aux modèles décrit par Developer Platform relève de la version 7.0 ([documentation Developer Platform](https://support.squarespace.com/hc/en-us/articles/206545717-Squarespace-Developer-Platform-FAQ)).

Vercel peut être conservé comme environnement de maquette distinct si cela devient utile. La mise en page native reste dans Squarespace, tandis que vous avez choisi Hostinger pour un déploiement ultérieur de la version autonome ; aucune migration ni bascule DNS n’est effectuée à ce stade.

État d’avancement au 29 octobre 2026 :

- **GitHub :** le nouveau [dépôt privé dédié](https://github.com/zehair-louzza/groupe-atc-squarespace) est alimenté sur `main`. Le dépôt public précédemment cloné et les autres dépôts existants ne sont pas modifiés.
- **Vercel :** la configuration consultée référence un projet `groupe-atc` lié au dépôt existant ; la récupération publique de son alias n’a pas permis de vérifier le rendu du site.
- **Squarespace :** le connecteur expose le commerce ; [l’éditeur du site existant](https://mandolin-jaguar-flrs.squarespace.com/config/pages) a ensuite été retrouvé dans Comet, en version 7.1.
- **Pages Squarespace :** six compositions natives enregistrées, avec illustration, logo historique et formulaire ; les nouvelles pages restent hors navigation et aucune activation n’a été effectuée.
- **Identité affichée :** GROUPE ATC est enregistré dans l’en-tête, le titre du site et le pied de page ; l’intitulé complet et les coordonnées corrigées sont présents dans le pied de page.
- **Ajustements du site :** panier et bouton Réserver retirés de l’en-tête ; Boutique déplacée hors navigation. Les données commerciales et anciennes pages sont conservées. La boutique n’est pas déclarée désactivée.
- **Périmètre préservé :** aucun déploiement Vercel, envoi au dépôt public ou changement de domaine, de DNS ou d’abonnement ; les nouvelles pages n’ont pas remplacé l’accueil et le menu publics.

Votre autorisation de créer les brouillons et d’afficher GROUPE ATC a donc été appliquée. Le formulaire natif est configuré avec la destination corrigée, sans inscription marketing automatique ; aucun envoi test n’a été effectué. La publication des nouvelles pages reste une décision séparée.

Les six pages disposent maintenant d’une seule version de la CSS commune enregistrée ; leurs affichages bureau/mobile ont été contrôlés dans Squarespace, avec un H1 par page et sans débordement ni chevauchement détecté. La navigation Accueil → Maintenance → Contact → Métiers et la saisie longue du formulaire ont été testées sans envoi ; le menu mobile natif en aperçu plein écran n’a toutefois pas pu être validé après un blocage de Comet.

Des copies DOM natives ont aussi été vérifiées à 375 et 1 440 px, uniquement pour l’affichage. Elles ne prouvent ni les scripts natifs, ni le menu, ni la transmission du formulaire ; les six pages restent désactivées.

## Formulaire de devis et traitement des demandes

### Champs recommandés

Le bloc Form permet de définir les champs et d’afficher des questions complémentaires selon les réponses à un champ de choix. Cette possibilité permet de conserver un formulaire initial court tout en précisant les demandes de travaux ou de suivi technique ([blocs Form et questions complémentaires](https://support.squarespace.com/hc/en-us/articles/206566737-Form-blocks)).

| Champ | Configuration proposée |
|---|---|
| Votre profil | Professionnel / Particulier. |
| Votre besoin | Dépannage / Travaux / Entretien ou suivi à étudier. |
| Métier concerné | Plomberie / Électricité / Serrurerie / Rénovation / Plusieurs métiers. |
| Commune et code postal | Obligatoire pour qualifier le déplacement. |
| Type de lieu | Choix simple ou texte court. |
| Nom et coordonnées | Nom, courriel, téléphone ; société facultative ou complément professionnel. |
| Description | Zone de texte suffisante, sans limite artificielle de 180 caractères. |
| Échéance souhaitée | Souhait du visiteur, sans promesse de disponibilité. |
| Complément travaux | Surface approximative et type de travaux. |
| Complément suivi | Nombre de sites, métiers concernés et besoins récurrents. |
| Photos ou documents | Facultatif, seulement si l’option est utile et correctement configurée. |
| Information sur les données | Notice concise avec lien vers la confidentialité ; aucun abonnement commercial précoché. |

Le formulaire natif préparé comporte Nom, Courriel professionnel, Site et commune, Votre besoin, Téléphone facultatif et Nature de la demande. Le champ de site accepte un logement comme un lieu professionnel ; le nom de l’entreprise n’est demandé que s’il est utile. Les six choix ont été corrigés puis relus après fermeture et réouverture de Contact : Essentiel 2 visites, Suivi 4 visites, Continuité 12 visites, maintenance à définir, Travaux TCE et Intervention ponctuelle. Aucun dépôt de fichier n’est ajouté.

Le bouton est « Envoyer ma demande » et la destination contact@anelecgroupe.com a été relue dans l’éditeur. Le message post-envoi a également été retrouvé, avec la réserve précisant qu’une demande ne vaut ni commande, ni devis accepté, ni confirmation d’intervention ; l’inscription aux e-mails a été observée décochée. L’affichage du formulaire, ses six choix au clavier et une saisie longue ont été contrôlés sans transmission ; la réception réelle reste à tester avec votre autorisation.

Dans la prévisualisation privée distincte, le bouton « Préparer ma demande » crée seulement un récapitulatif local ; aucun envoi automatique ni stockage serveur n’est simulé. Le tableau ci-dessus décrit des évolutions possibles, pas une liste de champs tous activés dans le formulaire natif.

### Paramétrage à vérifier

La destination doit être contrôlée : les nouveaux formulaires utilisent par défaut l’adresse de connexion du propriétaire ou du contributeur qui les crée. Squarespace recommande une seconde option de stockage ; le dépôt de fichiers nécessite Google reCAPTCHA, et le message affiché après envoi ne constitue pas automatiquement un courriel de confirmation au visiteur ([configuration et stockage des formulaires](https://support.squarespace.com/hc/en-us/articles/206566737-Form-blocks)).

Prévoir un test réel avant publication, avec réception, pièces jointes éventuelles et message de confirmation vérifiés. Ce test devra être autorisé et réalisé avec des données fictives, puis identifié comme tel pour éviter de le traiter comme une demande client.

## Tarifs, référencement et preuves

### Tarifs : lancement sans ambiguïté

La recommandation de départ est d’utiliser « Prestations sur devis » plutôt qu’une grille incomplète. Les montants de 40 € et 42 € restent dans les éléments internes à valider, sans être publiés dans les pages proposées.

Avant toute grille publique, préciser l’unité de main-d’œuvre, la fiscalité applicable, les frais de déplacement, les fournitures, les majorations éventuelles et les exclusions. Les conditions de gratuité d’un devis et d’une visite de diagnostic doivent également être distinguées.

### Référencement proposé

Chaque page doit cibler un besoin distinct et recevoir un titre ainsi qu’une description spécifiques. Squarespace permet de renseigner les descriptions SEO des pages et recommande des contenus lisibles, structurés et propres à chaque page ([checklist SEO](https://support.squarespace.com/hc/en-us/articles/360002090267-SEO-checklist), [descriptions SEO](https://support.squarespace.com/hc/en-us/articles/206016198-Adding-SEO-descriptions)).

Le tableau ci-dessous inclut le programme étendu et ses pages spécialisées futures. Les six pages de lancement disposent déjà de titres et descriptions dans le manifeste ; la prévisualisation reste volontairement en `noindex,nofollow`.

| Page | Titre SEO proposé | Description proposée |
|---|---|---|
| Accueil | GROUPE ATC : maintenance et travaux en Île-de-France | Plomberie, électricité, serrurerie et rénovation intérieure en Île-de-France. Présentez votre besoin à GROUPE ATC pour une étude adaptée. |
| Maintenance | Maintenance multitechnique en Île-de-France \| GROUPE ATC | Décrivez vos besoins d’entretien et de remise en état. Le périmètre des interventions et du suivi est défini selon vos locaux. |
| Dépannage | Dépannage bâtiment en Île-de-France \| GROUPE ATC | Un besoin en plomberie, électricité ou serrurerie ? Indiquez la commune et la situation pour étudier les modalités d’intervention. |
| Travaux | Travaux TCE et rénovation intérieure \| GROUPE ATC | Présentez votre projet de rénovation : plomberie, électricité, peinture, plaques de plâtre et carrelage, selon le périmètre étudié. |
| Contact | Contact et demande de devis \| GROUPE ATC | Contactez GROUPE ATC pour un dépannage, des travaux ou un besoin d’entretien en Île-de-France. Décrivez votre projet et sa localisation. |

Il s’agit de propositions éditoriales, sans recherche de volumes de requêtes ni promesse de classement. Les pages de maintenance contractuelle ne devront être indexées avec des promesses de contrat que lorsque l’offre correspondante sera définie.

## Déroulement de création et critères de réception

### Préparation

Conserver les décisions confirmées : renommage, intitulé complet, domaine et coordonnées. Finaliser l’identité juridique éditrice, le domaine de messagerie, les conditions opérationnelles et les droits des futurs contenus de réalisations.

### Construction

Créer les pages dans un espace de préparation non public, installer les styles globaux, puis réaliser l’accueil et une page métier représentative. Après validation de cette base, décliner les autres pages sans multiplier les systèmes graphiques.

### Vérification

Contrôler les contenus, le mobile, les liens, le formulaire, les coordonnées et les paramètres de référencement. Aucun logo client, tarif, délai ou chiffre d’ancienneté non validé ne doit subsister dans la version destinée au public.

### Publication

La mise en ligne et toute modification de domaine ou de DNS constituent une étape distincte à autoriser. L’accueil, la navigation et les anciennes pages ne sont pas remplacés ; seuls les changements globaux d’identité et les ajustements déjà autorisés ont été appliqués, tandis que les dépôts antérieurs restent inchangés.

| Critère | Résultat attendu |
|---|---|
| Marque | GROUPE ATC cohérent dans les pages, titres et formulaires. |
| Offre | Métiers explicites ; pas de prestations B3T importées par défaut. |
| Identité | Nouvelle palette ; aucune dépendance aux couleurs des pièces ANELEC. |
| Édition | Textes et images modifiables dans Squarespace, sans application externe indispensable. |
| Mobile | Pas de débordement, texte lisible, menu et boutons utilisables. |
| Navigation | Aucun lien factice ou page de démonstration visible. |
| Formulaire | Réception vérifiée et destination approuvée. |
| Données | Collecte limitée au besoin ; information de confidentialité adaptée. |
| Références | Attribution, contenu et droit d’usage validés. |
| Tarifs | Aucun montant incomplet ou unité supposée. |
| Publication | Validation explicite du site cible, de la version et du domaine. |

## Décisions confirmées et prochaines validations

Vous avez confirmé le renommage d’ANELEC, la signification du sigle et le maintien du domaine ; ces points ne sont plus des questions ouvertes. Le site Squarespace existant a également été identifié et les logos fournis ont été examinés.

- **Marque :** GROUPE ATC, soit GROUPE ANELEC TECHNIQUE ET CONCEPTE, selon l’orthographe demandée.
- **Domaine :** anelecgroupe.com, sans bascule DNS effectuée.
- **Contacts :** +33184809385 et 9 RUE DES COLONNES, 75002 PARIS ; courriel corrigé : contact@anelecgroupe.com.
- **Maintenance :** trois propositions de fréquence et un document de périmètre et de conditions ont été préparés, sans contrat activé.
- **Réalisations :** architecture présente dans le code, données vides, publication désactivée.
- **Brouillons autorisés :** six pages créées, contenus enregistrés et désactivation confirmée ; GROUPE ATC est configuré comme nom affiché.
- **Validation restante :** contrôler le menu mobile natif en aperçu visiteur, compléter les mentions juridiques, la confidentialité et les moyens de l’offre, puis autoriser un test réel de réception du formulaire avant une éventuelle publication. La CSS et les affichages des six pages sont désormais harmonisés et contrôlés ; les six choix et les réglages du formulaire sont relus, sans envoi de test. Le déploiement Hostinger est reporté selon votre demande, et son formulaire serveur reste à préparer.

La prévisualisation et les six brouillons natifs constituent deux versions distinctes. La mise en page native est réellement enregistrée dans Fluid Engine, avec ses propres styles, images et formulaire ; le compte rendu d’intégration précise la réception observée et les conditions restant à traiter avant une ouverture publique.
