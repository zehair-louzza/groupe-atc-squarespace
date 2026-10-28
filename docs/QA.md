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
