# GROUPE ATC : état d’intégration dans Squarespace

Mise à jour du 29 octobre 2026. Les six compositions natives sont enregistrées, avec vingt-six sections, un pied de page personnalisé, deux blocs image et un formulaire préparé. La finalisation n’est toutefois pas complète : le dernier contrôle a identifié des options de gabarit dans la liste du formulaire, puis la connexion à Comet s’est interrompue. Une tentative de reconnexion a échoué avec le même message de perte de liaison.

## Réalisé et enregistré

- **Identité :** GROUPE ATC apparaît dans le titre du site, l’en-tête et le pied de page ; l’intitulé complet reste GROUPE ANELEC TECHNIQUE ET CONCEPTE, selon l’orthographe demandée.
- **Courriel :** contact@anelecgroupe.com est enregistré dans les coordonnées, le pied de page et la destination du formulaire. La correction de « aneleggroupe » vers « anelecgroupe » est également appliquée aux sources, documents et pages de la prévisualisation privée.
- **Coordonnées :** 01 84 80 93 85 et 9 RUE DES COLONNES, 75002 PARIS ; le domaine demandé reste anelecgroupe.com.
- **Pied de page :** « Titre de votre site », l’adresse d’exemple et « Conçu avec Squarespace » sont remplacés par la marque, l’intitulé complet, l’adresse postale, le courriel cliquable et le téléphone.
- **Images :** illustration d’architecture sur Accueil avec texte alternatif et légende visible ; logo ANELEC original sur Groupe, présenté comme historique et affiché sans recadrage du signe.
- **Espacements natifs :** lignes inutilisées réduites dans les réglages de section, par les contrôles Squarespace. Les vues bureau et mobile ont été parcourues pour ces réglages ; cela ne constitue pas une réception visuelle complète des six pages.

ANELEC est l’ancien nom communiqué par l’entreprise, et non une filiale distincte. Cette identité de marque ne vaut pas vérification d’une modification de dénomination sociale au registre.

## Nettoyage du site vitrine

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

## Formulaire : préparé, mais correction nécessaire

Le bloc « GROUPE ATC | Demande technique » est présent sur Contact. La destination contact@anelecgroupe.com a été relue dans son éditeur ; les champs et l’intitulé « Site et commune » ont ensuite été retrouvés après avoir quitté Contact, ouvert Groupe et rouvert Contact.

- **Nom :** prénom et nom de famille obligatoires.
- **Courriel professionnel :** champ de réponse obligatoire ; aucune restriction de domaine professionnel n’a été ajoutée.
- **Site et commune :** obligatoire, avec une aide acceptant logement, commerce, bureaux ou copropriété ; le nom de l’entreprise n’est demandé que s’il est utile.
- **Votre besoin :** obligatoire, avec une aide sur les équipements, contraintes et calendrier ; rappel de ne pas fournir de données sensibles.
- **Téléphone :** facultatif.
- **Nature de la demande :** choix obligatoire, mais liste à corriger avant toute activation.

### Liste constatée au dernier contrôle

| Position après « Choisir une prestation » | Valeur observée | Valeur cible |
|---|---|---|
| 1 | Maintenance Essentiel : 2 visites par an | Identique |
| 2 | Maintenance Continuité : 12 visites par an | Maintenance Suivi : 4 visites par an |
| 3 | Option 3 | Maintenance Continuité : 12 visites par an |
| 4 | Travaux TCE | Maintenance : périmètre à définir |
| 5 | Option 5 | Travaux TCE |
| 6 | Intervention ponctuelle | Identique |

La dernière tentative de rouvrir l’éditeur pour corriger ces valeurs a échoué avant de permettre la correction. Il faut modifier les six options existantes, sans en ajouter à nouveau rapidement, puis relire la liste rendue après fermeture et réouverture de la page.

L’inscription aux e-mails a été décochée lors du paramétrage ; sa relecture finale reste à faire. Un message post-envoi a été saisi pour préciser qu’une demande ne vaut ni commande ni confirmation d’intervention, mais sa persistance doit également être relue. Aucun test d’envoi externe ni contrôle de réception réelle n’a été effectué.

## Contrôles réalisés et limites

### Dans Squarespace

- **Enregistrements :** les six compositions ont été sauvegardées et quittées ; Contact et Informations ne sont plus des reprises non confirmées.
- **En-tête :** un débordement horizontal a été corrigé par le dimensionnement de son conteneur ; Contact a ensuite été observé avec une largeur de document et de défilement de 1154 px.
- **Accueil :** premier contrôle au bureau à 1154 px et en vue mobile à 413 px, sans ancien courriel, texte générique de pied de page ni chevauchement mesuré. Ce contrôle a révélé une illustration trop aplatie.
- **Correction de l’illustration :** hauteur ensuite réajustée dans la grille native et enregistrée ; hauteur observée après sauvegarde d’environ 501 px, au lieu des 23 px du contrôle initial.
- **Logo historique :** image native chargée, texte alternatif saisi et option Ajuster vérifiée ; son cadre a ensuite été agrandi et sauvegardé sans recadrer le signe.
- **Désactivation :** Accueil a été relu avec « Activer la page » décoché pendant cette reprise. Les six pages avaient été désactivées lors de leur création et aucune activation n’a été effectuée ; la relecture collective finale reste à réaliser.

Les captures disponibles de cette reprise sont partielles et antérieures à certaines corrections. Elles ne constituent pas une validation finale des six pages sur ordinateur et mobile. Les derniers raffinements CSS, dont l’harmonisation du bouton du formulaire, sont préparés localement mais ne sont pas encore réappliqués uniformément aux six pages.

### Prévisualisation privée distincte

La prévisualisation privée, corrigée avec contact@anelecgroupe.com, avait déjà été contrôlée sur six pages à 1440 × 1000 et 375 × 812. Ses parcours de menu, accordéons, choix des formules, préparation locale d’une demande et récapitulatif avaient été testés sans envoi externe ; ces résultats ne valident pas le formulaire Squarespace.

Les quatre tests automatisés locaux passent lors de cette reprise. Les deux versions restent distinctes et ne doivent pas être confondues.

## À terminer dès le retour de Comet

- **Priorité formulaire :** remplacer les options de gabarit, rétablir Suivi et le choix de maintenance à définir, puis vérifier les six valeurs réellement rendues.
- **Réglages du formulaire :** relire destination, inscription marketing et message post-envoi, sans transmettre de demande.
- **Styles :** appliquer la dernière révision CSS aux six pages, puis vérifier les espacements, la hauteur de l’image et le bouton du formulaire.
- **Réception native :** contrôler chaque page au bureau et sur mobile, les liens entre brouillons, les images, le formulaire, le pied de page et l’absence de débordement ou de chevauchement.
- **Sécurité de publication :** relire les six réglages « Activer la page » et leur maintien hors navigation après sauvegarde.

La dernière page constatée avant la perte de liaison est Contact, après sa réouverture et la lecture des champs. Les modifications de composition et d’espacement précédentes sont enregistrées ; il ne faut ni recréer les six pages ni réajouter un formulaire.

## Conditions avant une ouverture publique

- **Juridique :** compléter l’entité éditrice, l’immatriculation, les mentions obligatoires, la confidentialité, les destinataires et modalités de conservation des données.
- **Offre :** valider les moyens, l’inventaire, les prix et conditions particulières avant de transformer les propositions en contrats.
- **Test réel :** obtenir une autorisation distincte pour envoyer une demande fictive et vérifier sa réception.
- **Mise en ligne :** obtenir un accord distinct pour activer les pages, remplacer l’accueil et la navigation, et définir les éventuelles redirections.

Les rythmes Essentiel, Suivi et Continuité restent des propositions de 2, 4 et 12 visites par an, sur une base d’un site, un technicien et deux heures maximum sur place par visite. Aucun tarif, astreinte permanente ou délai d’intervention garanti n’est inventé.

Aucun bouton de publication n’a été utilisé. Aucun DNS, domaine ou abonnement n’a été modifié, aucun code n’a été envoyé au dépôt GitHub distant et aucun déploiement Vercel n’a été lancé ; les changements globaux d’identité et de nettoyage de l’en-tête/pied de page sont distincts de l’activation des nouvelles pages.
