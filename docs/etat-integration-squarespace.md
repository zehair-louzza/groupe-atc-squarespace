# GROUPE ATC : état d’intégration dans Squarespace

Mise à jour du 28 octobre 2026. Le nettoyage de l’en-tête et du menu est enregistré, ainsi que la nouvelle composition native de quatre pages ; la finalisation de l’ensemble du site n’est pas achevée. La connexion à Comet a été interrompue pendant la reprise de Contact et ne s’est pas rétablie lors de la tentative de récupération.

## Nettoyage effectivement enregistré

- **Panier :** retiré de l’en-tête du site.
- **Réservation :** bouton « Réserver » retiré de l’en-tête.
- **Boutique :** déplacée de la navigation principale vers Hors navigation, sans suppression des produits, commandes ou contenus.
- **Données existantes :** anciennes pages et page Rendez-vous conservées ; aucun effacement de données commerciales.
- **Présentation :** section de réalisations en attente retirée du texte de Groupe, sans supprimer l’architecture prévue pour de futurs chantiers.

La boutique est masquée dans le menu, pas déclarée désactivée. La tentative de désactivation a été refusée par Squarespace avec une erreur de mise à jour ; les modifications correspondantes ont été annulées avant son déplacement hors navigation.

La navigation principale observée après nettoyage comporte Mentions légales, Services, À propos et Contact. Les six nouvelles pages n’ont pas été ajoutées à ce menu et l’accueil existant n’a pas été remplacé.

## Identité et coordonnées

- **Marque affichée :** GROUPE ATC, dans l’en-tête et le titre du site.
- **Intitulé complet :** GROUPE ANELEC TECHNIQUE ET CONCEPTE, selon l’orthographe demandée.
- **Historique :** ANELEC est l’ancien nom, sans création d’une filiale distincte.
- **Domaine conservé :** anelecgroupe.com ; aucun changement de domaine ou de DNS.
- **Téléphone :** 01 84 80 93 85 ; liens téléphoniques au format +33184809385.
- **Adresse :** 9 RUE DES COLONNES, 75002 PARIS.
- **Courriel confirmé :** contact@anelecgroupe.com.

La correction du courriel est intégrée dans les données, les six sources de contenus natifs, les documents de préparation et les six pages de la prévisualisation privée. Elle est enregistrée dans les contenus natifs Accueil et Groupe ; une vérification finale de Contact, Informations et du pied de page reste nécessaire dans Squarespace. L’ancienne saisie erronée n’est pas une adresse de réception à conserver.

## État des six pages natives

Les six brouillons existent dans [l’éditeur Squarespace du site existant](https://mandolin-jaguar-flrs.squarespace.com/config/pages). Cet accès nécessite votre session Squarespace et ne constitue pas une nouvelle adresse publique.

| Page | Adresse du brouillon | Composition enregistrée ou état constaté |
|---|---|---|
| Accueil | `/groupe-atc-accueil` | Quatre sections Fluid Engine, contenus Markdown natifs, styles de page et bloc image natif positionné à droite du texte d’introduction. |
| Maintenance | `/groupe-atc-maintenance` | Quatre sections Fluid Engine, introduction, propositions de visites, périmètre, exclusions et conditions. |
| Métiers | `/groupe-atc-metiers` | Cinq sections Fluid Engine, travaux TCE, plomberie, électricité, serrurerie, rénovation et dépannage. |
| Groupe | `/groupe-atc-groupe` | Quatre sections Fluid Engine, changement de nom, approche, territoire, historique et contact. |
| Contact | `/groupe-atc-contact` | Reprise commencée, puis connexion interrompue ; la persistance des dernières modifications n’a pas pu être confirmée. |
| Informations | `/groupe-atc-informations` | Brouillon éditorial précédent conservé ; recomposition native et contrôle final du courriel restent à effectuer. |

Les nouvelles compositions utilisent de vraies sections et des blocs Squarespace, pas un site entier collé dans un bloc HTML. La palette préparée associe bleu nuit, blanc minéral et accent bleu ; elle n’est pas dérivée des couleurs des pièces ANELEC. La typographie et les styles des nouvelles pages sont appliqués par une injection CSS propre aux pages, sans remplacement général du thème des anciennes pages.

Les quatre compositions enregistrées représentent dix-sept sections natives. Ce chiffre n’inclut pas les deux brouillons restants, dont la finalisation n’est pas validée.

## Offre de maintenance conservée

- **Essentiel :** proposition de deux visites par an.
- **Suivi :** proposition de quatre visites par an.
- **Continuité :** proposition de douze visites par an.
- **Base proposée :** un site, un technicien et deux heures maximum sur place par visite.
- **Conditions :** audit initial, inventaire et périmètre écrits, prix sur étude, exclusions, organisation et compte rendu à confirmer au contrat.

Ces formules ne sont pas des contrats déjà actifs. Aucun tarif, service permanent, délai d’arrivée ou délai de réparation garanti n’est inventé.

## Contrôles et distinction entre les deux versions

### Squarespace natif

Les pages Accueil, Maintenance, Métiers et Groupe ont été enregistrées et l’éditeur a été quitté après sauvegarde. Métiers et Groupe ont également reçu un premier contrôle structurel après sortie : style de page présent, un H1 et absence de débordement horizontal dans la vue bureau observée.

Les six pages avaient été vérifiées désactivées lors de leur création. Aucune action d’activation ni de publication n’a été réalisée pendant cette reprise ; une relecture collective de leurs réglages à l’issue de la mise en page reste à faire.

La réception graphique native complète, notamment mobile, n’est pas déclarée terminée. Les captures directes de Comet échouaient déjà ; la déconnexion ultérieure empêche aussi de contrôler les deux dernières pages et le pied de page.

### Prévisualisation privée distincte

La prévisualisation associée est corrigée avec contact@anelecgroupe.com. Ses six pages ont été rejouées à 1440 × 1000 et 375 × 812, avec chargement des images avant capture : un H1 par page, aucun débordement horizontal, aucune image manquante et aucun ancien courriel dans les pages contrôlées.

Le menu mobile, les huit accordéons, le choix des trois formules, les validations du formulaire local, le récapitulatif, la copie, le retour et la conservation des valeurs ont été testés par interaction. Une demande longue, des balises traitées comme texte, des paramètres inconnus et le repli d’une image indisponible ont aussi été contrôlés ; aucune exception JavaScript n’a été relevée dans ces parcours et aucun message externe n’a été envoyé.

Les quatre tests automatisés passent. Cette réception concerne la prévisualisation : elle ne prouve pas le fonctionnement d’un formulaire natif Squarespace ni l’achèvement de la mise en page dans Squarespace.

## Ce qui reste à terminer dans l’éditeur

- **Contact :** reprendre l’état exact du brouillon, enregistrer les sections et contrôler le courriel corrigé.
- **Informations :** appliquer la composition préparée, remplacer les anciennes coordonnées et conserver le statut de préparation juridique.
- **Pied de page :** remplacer « Titre de votre site », l’adresse d’exemple et la mention de création générique par l’identité et les coordonnées de GROUPE ATC.
- **Accueil :** appliquer la dernière révision de style et la légende visible de l’illustration, préparées dans les sources mais pas encore enregistrées dans la page.
- **Logos :** fichiers ANELEC conservés sans modification et présents dans la prévisualisation comme éléments historiques ; leur placement dans les nouveaux brouillons natifs reste à finaliser.
- **Formulaire natif :** créer et configurer le bloc, sa réception et le stockage ; aucun envoi de test externe sans autorisation.
- **Réception :** contrôler les six pages au bureau et sur mobile, leurs liens, le pied de page, les visuels et leur état désactivé après sauvegarde.
- **Juridique et exploitation :** compléter les mentions obligatoires, la confidentialité et les conditions contractuelles avant toute ouverture publique.

## Publication et services externes

Aucun bouton de publication n’a été utilisé. Aucun DNS ou abonnement n’a été modifié, aucun contenu n’a été envoyé au dépôt GitHub distant et aucun déploiement Vercel n’a été lancé.

Le dépôt cible étant public, un envoi de code distant exige un accord spécifique ; la simple sélection de GitHub ou Vercel n’est pas considérée comme une autorisation de publication. L’architecture des réalisations futures reste dans le code, avec une liste vide et une fonctionnalité désactivée.

La reprise nécessite le rétablissement de l’accès à Comet avec l’éditeur Squarespace ouvert. Il n’est pas nécessaire de renouveler l’autorisation déjà donnée pour travailler sur ces mêmes brouillons désactivés.
