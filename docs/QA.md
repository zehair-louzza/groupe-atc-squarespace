# Inventaire de réception

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
- Vérifier logo historique inchangé, marque GROUPE ATC principale et légende des illustrations.
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
- **Nettoyage natif :** panier et Réserver retirés ; Boutique hors navigation, mais pas désactivée et aucune donnée supprimée.
- **Mise en page native :** Accueil, Maintenance, Métiers et Groupe enregistrés avec respectivement quatre, quatre, cinq et quatre sections ; image native sur Accueil.
- **Limite de connexion :** déconnexion de Comet pendant Contact ; la tentative de récupération échoue également. Contact, Informations, pied de page, formulaire, placement du logo et réception native finale ne sont pas déclarés terminés.

L’état détaillé actuel est dans `etat-integration-squarespace.md` et `native-layout-status.json`. Les captures de la prévisualisation ne constituent pas une réception graphique des pages natives.
