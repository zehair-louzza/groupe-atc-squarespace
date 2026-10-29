# Inventaire de réception

## Dernière passe : logo GROUPE ATC

- **Fichiers :** symbole original extrait sans redessin, nouveau lettrage vectorisé GROUPE ATC, SVG autonome sans ressource externe et PNG transparent 2 100 × 500 px, 43 323 octets. Les originaux ANELEC sont conservés.
- **Tests locaux :** onze tests automatisés passent. Les douze rendus de six pages à 1 440 et 375 px passent, ainsi que quinze groupes de parcours, dont les logos chargés, leurs proportions et les liens de retour à l’accueil.
- **Version hébergée :** la même prévisualisation a été redéployée, puis ses douze rendus et quinze groupes de parcours ont été rejoués dans des contextes neufs. Aucune exception JavaScript et aucun message externe ; le relevé courant `docs/browser-results-updated.json` masque l’URL temporaire.
- **Squarespace :** logo principal enregistré dans l’en-tête natif ; texte alternatif GROUPE ATC, hauteur constatée 48 px sur ordinateur et 40 px en vue mobile, image chargée depuis le CDN Squarespace. Le résultat est consigné dans `docs/native-logo-verification.json`.
- **Cohérence :** mentions de logo et de visibilité corrigées dans les paragraphes natifs de Groupe et Informations. Les fichiers historiques restent identifiés comme tels ; aucun réglage d’activation ne change.

## Identité légale, continuité et expérience : 29 octobre 2026

Les nouvelles pièces et les confirmations utilisateur renseignent l’entreprise et l’expérience des personnes. Le nom GROUPE ATC correspond à un changement de dénomination sociale de la même société, avec une nouvelle présidence, non à une création d’entreprise ou de filiale.

- **Données :** source dédiée `data/legal.json`, identifiants et dates Sirene/RNE distinctes, sources externes conservées ; rôle de direction de publication et hébergement final non inventés.
- **Expérience :** affirmation explicite « Nos techniciens et notre directeur de travaux disposent de plus de 10 ans d’expérience dans leur domaine », sans l’attribuer à l’ancienneté de la société.
- **Squarespace :** cinq pages enregistrées et rouvertes, dix vues à 1 531/409 px, un H1 par page, aucun débordement ni texte sortant de sa section. Les quatorze paires de champs des mentions ne comportent plus de valeurs fictives.
- **Visibilité :** les trois pages hors navigation contrôlées étaient déjà activées ; aucun commutateur d’activation n’a été changé.
- **Source autonome :** neuf tests unitaires et douze rendus ; treize groupes de parcours comprenant identité, expérience, contact, navigation, propositions de maintenance et les six carrousels.
- **Régression :** les six métiers et dix-sept lignes de prestations restent conservés. Aucune référence client inventée, aucun transfert d’hébergement et aucun envoi de formulaire.

Les relevés natifs sont `docs/native-company-update-verification.json` et `docs/native-company-page-activation.json`. Les constats précédents ci-dessous sont historiques et ne doivent pas être utilisés pour présenter les trois pages contrôlées comme désactivées.

## Carrousels photo : préparation du 29 octobre 2026

La nouvelle fonction du site autonome comporte six carrousels indépendants avec flèches. Les photos réelles restent à fournir ; chaque galerie comporte trois réservations explicitement comptées comme emplacements, sans publication de faux chantiers.

- **Tests unitaires :** sept réussites, dont la sélection des seules photos locales autorisées, le repli sur des emplacements et la protection des descriptions.
- **Non-régression locale :** douze rendus des six pages à 1 440 et 375 px, dix groupes de parcours, aucun débordement horizontal, aucune image cassée et aucune exception JavaScript.
- **Carrousels :** les douze flèches, les deux sens de boucle et l'indépendance des six index sont vérifiés par clics ; gauche/droite, Début/Fin et focus visible sont vérifiés au clavier.
- **Téléphone :** balayages gauche et droite avec événements tactiles Chromium, puis aller-retour bureau/téléphone ; contrôle exploratoire supplémentaire à 320 px sans débordement.
- **Cas limites :** une seule photo désactive les deux flèches, deux photos changent image/description/légende, une photo défaillante conserve la navigation et une session sans JavaScript conserve couverture, services et contact.
- **Contrôle visuel :** captures des six pages, des carrousels au bureau et au téléphone, d'un état après interaction et du repli d'image indisponible ; compteurs lisibles à 12 px minimum.
- **Périmètre :** les injections de données et la photo absente sont uniquement des simulations dans le navigateur de recette, jamais des données publiées. Zéro demande transmise et zéro photo de chantier ajoutée.
- **Intégration native :** aucun changement Squarespace ni synchronisation distante pour cette nouvelle fonction ; les preuves natives ci-dessous portent sur l'état antérieur à une image par service.

Le relevé courant du site autonome est `docs/browser-results-updated.json`. La dernière passe hébergée, après l’intégration du logo, valide douze rendus, quinze groupes de parcours et les sept familles de vérifications des carrousels, sans erreur JavaScript ni message transmis.

## Complétude de Services et demande de trois colonnes

- **Documents relus :** présentation ANELEC et PDF de sept pages ; la page 2 établit aussi les métiers de maçonnerie et menuiserie.
- **Contenu natif :** six familles, dix-sept lignes de prestations dont quinze tâches détaillées et deux intitulés généraux ; trente champs relus sur la page sauvegardée, un H1 et six H2 métier.
- **Photos natives :** six blocs image conservés, vides, et six zones 4:3 « PHOTO À AJOUTER ». Aucune photo de chantier non fournie n’est inventée.
- **Consultation native bureau :** six réservations de 360 × 270 px dans une fenêtre de 1 531 px ; trois abscisses distinctes et deux ordonnées de rangée communes. Aucun débordement horizontal.
- **Consultation native mobile :** fenêtre de 409 px, six réservations de 361 × 270,75 px sur une seule colonne ; aucun débordement horizontal.
- **Sources autonomes :** six tests unitaires passent ; les six pages sont contrôlées à 1 440 et 375 px. Les six liens métier préremplissent le bon métier et « Travaux » dans le contact.
- **Non-régression :** neuf parcours de recette incluant la nouvelle grille, le menu, huit accordéons, les trois formules, la validation, la copie, les entrées longues/inertes et le repli image. Aucune erreur JavaScript ni transmission externe.
- **Prévisualisation hébergée :** même application privée mise à jour, puis douze affichages et les neuf parcours rejoués dans un contexte neuf. Les six préremplissages métier sont contrôlés après chargement effectif du formulaire ; aucune erreur JavaScript ni transmission.
- **Limites :** le CSS de consultation recompose les trois groupes techniques de l’éditeur natif ; ses outils restent accessibles sans cette recomposition pendant l’édition. Les contrôles du menu natif et de la réception réelle des formulaires ne sont pas étendus par cette passe. Aucun nouveau brouillon, déploiement Hostinger/Vercel ou changement DNS.

Les relevés de cette passe sont `native-services-desktop-verification.json`, `native-services-mobile-verification.json`, le manifeste `squarespace/native/existing-services.json` et la recette `browser-results-updated.json`. Les captures du site autonome sont conservées localement hors du dossier déployé.

Prévisualisation privée seulement. Aucun formulaire externe, envoi, DNS ou déploiement Vercel à réaliser pendant les tests.

- Vérifier les six pages, un titre principal par page, ordinateur 1440 × 1000 et mobile 375 × 812.
- Vérifier les cinq liens de navigation et les liens métiers avec ancres.
- Vérifier menu fermé → ouvert → fermé, touche Échap et changement de largeur mobile → bureau.
- Ouvrir et refermer les accordéons de périmètre et de conditions.
- Choisir chaque formule de maintenance ; vérifier le préremplissage du contact.
- Tester validation vide, format de courriel incorrect, retour à l’étape précédente et récapitulatif rempli.
- Vérifier qu’aucun message n’est transmis et que les coordonnées exactes sont conservées.
- Vérifier le bouton de copie et son repli par sélection manuelle.
- Vérifier absence de réalisations inventées, absence de menu Réalisations et absence de page publiée.
- Vérifier le nouveau logo principal GROUPE ATC, issu des tracés du symbole fourni, les archives ANELEC inchangées et les légendes des illustrations. La consigne explicite du 29 octobre remplace l’ancien maintien du lettrage ANELEC sur le logo principal.
- Vérifier absence de débordement horizontal, texte inférieur à 12 px, erreurs console et images défectueuses.
- Scénarios hors parcours : paramètre de formule inconnu ; contenu utilisateur contenant des balises ; image indisponible.
- Après déploiement privé, ouvrir un nouveau contexte et tester le parcours maintenance → contact → récapitulatif.

## Résultats du 28 octobre 2026

La validation porte sur la prévisualisation statique, pas sur un formulaire Squarespace configuré. Les envois de courriels, appels téléphoniques et modifications de comptes distants sont volontairement exclus.

- **Affichage :** six pages contrôlées à 1440 × 1000 et 375 × 812 ; un H1 par page, aucune image manquante et aucun débordement horizontal.
- **Navigation :** aucun lien interne ni ancre cassé dans l’inventaire des six pages.
- **Menu :** ouverture, fermeture, Échap et changement de largeur testés ; retour correct aux états bureau et mobile.
- **Maintenance :** huit accordéons testés en aller-retour, et les trois boutons de formule préremplissent correctement le contact.
- **Formulaire :** champs vides, courriel invalide, retour, valeurs conservées, récapitulatif et modification testés par interaction.
- **Copie :** copie dans le presse-papiers de test vérifiée ; aucun message n’est envoyé automatiquement.
- **Replis :** sélection manuelle proposée lorsque le presse-papiers est refusé ; message visible lorsque l’image échoue, y compris avant l’exécution du script.
- **Formats supplémentaires :** accueil vérifié à 320 px de large et dans une fenêtre bureau de 1440 × 600, sans débordement.
- **Entrées inhabituelles :** paramètres inconnus ignorés ; balises HTML conservées comme texte inerte dans le récapitulatif.
- **Lisibilité :** aucun texte visible inférieur à 12 px dans les pages inventoriées ; contraste minimal mesuré de 6,24:1 pour les petits textes visibles de l’état initial, au-dessus du seuil de contrôle de 4,5:1.
- **Console :** aucune exception JavaScript observée au cours de ces parcours.
- **Identité :** intitulé complet exact, domaine et coordonnées conservés ; logo ancien attribué explicitement.
- **Références :** zéro projet publié, liste de données vide, fonctionnalité et menu Réalisations désactivés.

Les captures de contrôle sont conservées localement dans `docs/screenshots/`, hors du dossier web déployé. Cette réception ne vaut ni audit d’accessibilité exhaustif, ni contrôle juridique, ni validation de capacité opérationnelle des formules.

## Contrôle de la prévisualisation hébergée

Après le déploiement privé, une nouvelle session de navigateur cloud a ouvert la version hébergée. Le parcours Accueil → Maintenance → Suivi → Contact → Récapitulatif a été réalisé avec les contrôles visibles et des coordonnées fictives.

Le préremplissage, le changement d’étape, la conservation de la formule et l’affichage du récapitulatif sont corrects, sans débordement horizontal. Le résultat indique explicitement qu’aucun message n’a été envoyé ; aucun bouton de messagerie ni appel téléphonique n’a été activé.

Les quatre tests automatisés passent également. Le code est enregistré dans un commit local, sans envoi au dépôt GitHub distant ; la prévisualisation ne constitue pas une intégration native Squarespace et aucun déploiement Vercel n’a été lancé.

## Réception des brouillons natifs Squarespace

Cette étape ultérieure est distincte de la réception de la prévisualisation ci-dessus. L’autorisation donnée couvre six brouillons désactivés et le nom affiché GROUPE ATC, pas la publication de ces pages.

- **Identité :** GROUPE ATC enregistré dans l’en-tête et confirmé après sortie de l’éditeur ; le titre du document affiche également GROUPE ATC.
- **Pages :** les six adresses `/groupe-atc-…` ont été ouvertes après enregistrement et leur titre principal correspond au contenu attendu.
- **Protection :** « Activer la page » est décoché dans les six dialogues Général ; les pages sont rangées Hors navigation, sans confondre ce rangement avec la désactivation.
- **Navigation :** les entrées existantes Mentions légales, Boutique, Services, À propos, Contact et l’action Réserver sont conservées ; aucune nouvelle page n’y a été ajoutée.
- **Structure bureau :** un titre principal par page et aucun débordement horizontal détecté dans les six pages contrôlées.
- **Mobile partiel :** Accueil et Contact contrôlés dans la vue téléphone Squarespace, avec une largeur de document de 413 px ; aucun débordement horizontal ni dépassement du contenu Markdown hors de son bloc.
- **Formulaire :** aucun formulaire natif de collecte n’a été activé ; l’adresse de réception reste à confirmer.
- **Limites :** les captures Comet expirent ; le contrôle mobile de Maintenance n’a pas pu être stabilisé. Métiers, Groupe et Informations n’ont pas reçu de contrôle mobile final.

Les données de cette étape sont dans `native-squarespace-results.json`. La saisie éditoriale est terminée, mais la reproduction graphique complète de la maquette, ses blocs d’image et boutons, le formulaire et la réception visuelle native restent à effectuer ; ne pas déclarer le nouveau site prêt à publier.

## Mise à jour : correction du courriel et reprise graphique

Cette mise à jour remplace les anciennes indications sur le courriel et la conservation du panier, de Réserver et de Boutique dans le menu. Le bon courriel est contact@anelecgroupe.com, confirmé explicitement par l’utilisateur.

- **Prévisualisation :** douze affichages rejoués, soit six pages à 1440 × 1000 et 375 × 812, avec chargement effectif des images avant capture ; aucun débordement, ancien courriel, H1 en double ou image manquante.
- **Parcours :** menu mobile, huit accordéons, trois formules, validations vide et invalide, récapitulatif, copie et modification rejoués par interaction.
- **Hors parcours :** demande longue, balises inertes, paramètres inconnus et repli d’image indisponible contrôlés ; aucune exception JavaScript et aucun message externe envoyé.
- **Tests :** quatre tests automatisés passent ; le script reproductible est `tests/browser-qa.mjs`, avec les résultats dans `browser-results-updated.json`.
- **Version hébergée :** les douze affichages et l’ensemble des parcours ci-dessus ont également été rejoués dans un contexte neuf après le déploiement privé, sans exception JavaScript ni envoi externe.
- **Ajustements natifs :** panier et Réserver retirés ; Boutique hors navigation, mais pas désactivée et aucune donnée supprimée.
- **Mise en page native :** Accueil, Maintenance, Métiers et Groupe enregistrés avec respectivement quatre, quatre, cinq et quatre sections ; image native sur Accueil.
- **Limite de connexion :** déconnexion de Comet pendant Contact ; la tentative de récupération échoue également. Contact, Informations, pied de page, formulaire, placement du logo et réception native finale ne sont pas déclarés terminés.

L’état détaillé actuel est dans `etat-integration-squarespace.md` et `native-layout-status.json`. Les captures de la prévisualisation ne constituent pas une réception graphique des pages natives.

## Reprise native du 29 octobre 2026

Cette section remplace l’état natif partiel du 28 octobre. Comet a d’abord fonctionné, puis a perdu la liaison avec un message `keepalive_timeout` lors du dernier contrôle du formulaire ; le redémarrage du navigateur de contrôle n’a pas rétabli les lectures.

- **Composition enregistrée :** Accueil 4 sections, Maintenance 4, Métiers 5, Groupe 4, Contact 4 et Informations 5, soit 26 sections.
- **Pied de page :** identité et coordonnées corrigées enregistrées ; aucun texte générique de titre, courriel d’exemple ou crédit de création dans le premier contrôle d’Accueil.
- **Images :** illustration d’accueil et logo historique natifs, avec textes alternatifs ; la hauteur trop faible de l’illustration a été corrigée et observée à environ 501 px après sauvegarde.
- **Espacements :** lignes inutilisées réduites par les réglages natifs ; les relevés sont dans `native-spacing-results.json`.
- **Formulaire :** bloc natif créé, destination contact@anelecgroupe.com relue ; le champ Site et commune a été retrouvé après fermeture et réouverture de Contact.
- **Défaut identifié :** la liste rendue contient encore Option 3 et Option 5, et Suivi manque ; ne pas considérer le formulaire comme finalisé. La cible est dans `squarespace/native/form-spec.json`.
- **Contrôle partiel :** Accueil vérifié à 1154 px et dans la vue mobile à 413 px avant la correction de hauteur de l’image ; absence de débordement horizontal et de chevauchement mesuré à ce stade.
- **Désactivation :** Accueil relu désactivé lors de cette reprise ; aucune activation effectuée. La relecture collective finale des six pages reste à faire.
- **Styles :** dernière révision locale non encore réappliquée uniformément aux six pages ; ne pas l’assimiler à une preuve de réception.
- **Tests locaux :** quatre tests unitaires passent ; aucun envoi externe.

La réception visuelle native complète des six pages, les liens, la liste du formulaire, le message post-envoi et l’état final des réglages ne sont pas validés. Les captures natives de cette reprise sont partielles et antérieures à certaines corrections ; aucun résultat de la prévisualisation privée ne remplace ces contrôles.

## Seconde reprise du 29 octobre : formulaire corrigé

Cette section remplace les points précédents concernant le défaut de liste et les relectures de configuration en attente. La connexion à Comet a fonctionné pour ces modifications, puis s’est interrompue de nouveau pendant la passe graphique suivante.

- **Choix :** les six entrées existantes ont été corrigées, sans recréer le bloc ni ajouter d’options. Essentiel 2 visites, Suivi 4 visites, Continuité 12 visites, maintenance à définir, Travaux TCE et Intervention ponctuelle ont été relus dans le menu rendu après sortie de l’éditeur, ouverture de Groupe et réouverture de Contact.
- **Destination :** contact@anelecgroupe.com retrouvée dans l’éditeur du formulaire.
- **Marketing :** inscription aux e-mails observée décochée ; champ de courriel toujours obligatoire.
- **Post-envoi :** message complet relu dans son éditeur, avec les réserves sur commande, devis et confirmation d’intervention.
- **Limite :** aucun envoi ni test de délivrabilité ; le message n’a pas été déclenché par transmission réelle.
- **Graphisme :** tentative de passe Contact interrompue avant la production d’un relevé ou d’une capture. Ne pas conclure que la dernière CSS a été sauvegardée, ni que la réception ordinateur/mobile a été faite.

La réception visuelle complète et la relecture collective des six pages désactivées restent en attente. La connexion a échoué une seconde fois après la tentative de reprise, et l’incident de liaison a été signalé.

## Dernière reprise du 29 octobre : styles et affichages contrôlés

Cette section remplace les validations graphiques encore en attente dans les sections historiques précédentes. Les six pages ont été revues, avec une seule version de la CSS commune enregistrée par page, en conservant leur désactivation et leur placement hors navigation.

- **Douze vues natives :** 1 154 px et 413 px sur Accueil, Maintenance, Métiers, Groupe, Contact et Informations ; un H1 par page, 26 sections au total, aucune ancienne adresse électronique ni pied de page générique.
- **Mise en page :** aucun débordement horizontal, contenu Markdown dépassant latéralement ou chevauchement entre blocs détecté ; images chargées et textes alternatifs présents.
- **Source du défaut de styles :** le champ accessible de CodeMirror est un tampon d’entrée, pas le document entier. Le remplacement a été fait en ciblant une ligne visible, sélectionnant tout le document par clavier, puis saisissant une seule feuille avant sauvegarde.
- **Navigation réelle :** clics Accueil → Maintenance → Contact → Métiers réussis dans la prévisualisation authentifiée, sans activer les pages.
- **Saisie réelle :** six choix de prestation parcourus au clavier ; texte de 2 040 caractères à 413 px, sans débordement ; champs de test vides après sortie puis réouverture de Contact. Aucun envoi.
- **Douze rendus complémentaires :** copies DOM natives sans scripts à 375 et 1 440 px, avec un H1, une seule feuille de page, images chargées, aucune largeur excédentaire ni dépassement vertical de texte. Ce sont des vérifications de rendu, pas des preuves de fonctionnement natif.
- **Limite menu :** ouverture/fermeture non validée dans l’éditeur, puis blocage lors du passage en aperçu plein écran et du contrôle direct à 375 px. La simulation de dimensions a été retirée avec succès ; le contrôle Comet a été arrêté.
- **Limites générales :** aucune transmission ni délivrabilité testée ; pas d’audit exhaustif des scripts tiers, de la console Squarespace ou d’accessibilité.

Les relevés actuels sont `native-final-*.json`, `native-detached-qa.json` et `native-interaction-verification.json`. Le dépôt GitHub privé dédié a été créé et alimenté ; le futur hébergement Hostinger est préparé documentairement, sans déploiement, bascule DNS ni modification des dépôts antérieurs.

## Correction métier suivante

Les textes du site autonome et les sources natives sont limités aux métiers confirmés. Le cinquième test protège les six pages HTML, les six textes natifs, le fichier de sections et les deux documents commerciaux contre le retour des spécialités écartées.

Le module `runPreviewQA` a été rejoué après reconstruction : douze rendus, six parcours, aucune erreur JavaScript ni message externe. Les résultats sont dans `browser-results-updated.json` ; les captures Maintenance à 375 et 1 440 px ont été relues.

La prévisualisation privée existante a été actualisée, puis le même module a été rejoué sur la version hébergée dans un nouveau contexte navigateur. Les douze rendus et six parcours passent également ; le relevé final conserve le libellé `hosted-private-preview`, sans URL temporaire ni jeton d’accès.

La première tentative Comet avait empêché toute modification native. Cette limite a été levée lors de la reprise suivante : les deux corrections sont maintenant enregistrées, sans activation de nouveau brouillon.

## Reprise native terminée

Le paragraphe d’exclusions de Maintenance a été remplacé dans l’éditeur Markdown, sans dupliquer le titre ni modifier les autres sections. La désactivation de la page a été enregistrée puis relue décochée dans ses paramètres.

La page Services contient huit champs corrigés selon la présentation ANELEC fournie. Les promesses non confirmées ont été remplacées par les tâches concrètes de plomberie, d’électricité, de serrurerie et de rénovation intérieure ; les balises de titres et les deux paragraphes d’introduction sont conservés.

Les deux pages ont été rouvertes après sauvegarde. Aucune spécialité écartée, ancien encart non confirmé ou dépassement de texte sur sa section n’a été détecté lors des relevés ; aucun formulaire n’a été envoyé.

Le relevé de cette passe est `native-scope-verification.json` : Services et Maintenance à 1 154/413 px, sans débordement horizontal, puis désactivation de Maintenance relue. Les cinq autres réglages d’activation n’ont pas été recontrôlés, et aucun test du menu natif ou de transmission n’est ajouté à cette recette ciblée.
