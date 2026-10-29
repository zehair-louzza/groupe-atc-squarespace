# GROUPE ATC : carrousels photo par service

Le choix confirmé est un carrousel avec flèches pour chacun des six services. La grille conserve trois services par ligne sur ordinateur, deux rangées au total et une colonne sur téléphone.

## Fonctionnement préparé

- **Navigation :** deux flèches par galerie, passage du dernier au premier emplacement et index indépendant pour chaque métier.
- **Accessibilité :** boutons de 44 × 44 px minimum, libellés par métier, focus visible, navigation au clavier avec gauche/droite et Début/Fin, compteur annoncé après interaction.
- **Téléphone :** mêmes flèches et balayage horizontal ; le défilement vertical de la page reste disponible.
- **Rythme :** aucun défilement automatique.
- **Absence de photos :** trois emplacements de démonstration par métier, explicitement nommés « Emplacement ». Ils ne représentent ni trois photos reçues, ni trois références de chantier.
- **Photos fournies :** le nombre réel d'images remplace automatiquement les emplacements ; une seule image désactive les deux flèches.
- **Repli :** une photo manquante laisse un message et les contrôles de navigation disponibles ; sans JavaScript, la couverture et les liens métier restent accessibles.

## Ajouter les photos réelles

Les fichiers sont à fournir par métier : plomberie, électricité, serrurerie, rénovation intérieure, maçonnerie et menuiserie. Préciser leur ordre, leur description et, si utile, une courte légende ; ne pas publier de personne, adresse privée, plaque, client ou marque sans les autorisations nécessaires.

Dans `data/services.json`, chaque famille possède une liste `photos`, vide à ce stade. Ajouter les images autorisées dans `site/assets/`, puis renseigner la liste avec ce modèle de structure, qui n'est pas une réalisation publiée :

```json
{
  "src": "./assets/plomberie/nom-du-fichier.webp",
  "alt": "Description précise de ce que montre la photo",
  "caption": "Légende facultative",
  "approved": true,
  "rightsConfirmed": true
}
```

Le gabarit n'affiche comme photos que les fichiers locaux possédant une description, une approbation et une confirmation des droits. Des entrées incomplètes ou non autorisées restent masquées ; le nombre de photos n'est pas limité aux trois emplacements provisoires.

Après ajout, reconstruire avec `npm run build`, exécuter `npm test` et relancer la recette navigateur. L'ordre de la liste est l'ordre du carrousel ; une légende vide est acceptée.

## Distinction entre prévisualisation et site natif

Cette nouvelle fonction est implémentée dans le site autonome destiné à la prévisualisation puis, ultérieurement, à Hostinger. Elle n'a pas été enregistrée dans Squarespace ; les sources sont conservées dans le dépôt dédié lors de la synchronisation de la mise à jour de l’entreprise. Les relevés natifs antérieurs restent historiques.

Les six blocs image natifs actuellement présents dans Services restent des blocs à une image. Leur remplacement par une solution multi-image doit faire l'objet d'une intégration et d'une vérification dans l'éditeur, sans supprimer les descriptions de services ni le formulaire, et sans activer les nouveaux brouillons.

Aucun changement de domaine, transfert Hostinger, déploiement Vercel, envoi de formulaire ou modification du site public n'est effectué par cette préparation.
