# Parcours et réception de la finalisation native

Les six pages restent désactivées pendant les modifications. Le travail couvre la correction du courriel, la mise en page native et le retrait des éléments commerciaux non pertinents, sans suppression de produits, commandes ou anciennes pages.

## Identité et coordonnées

- Ouvrir chacune des six pages dans Squarespace.
- Attendre GROUPE ATC dans l’en-tête et le bon titre principal.
- Vérifier les coordonnées visibles et les liens de messagerie : contact@anelecgroupe.com uniquement.
- Garder le téléphone 01 84 80 93 85 et l’adresse 9 RUE DES COLONNES, 75002 PARIS.

## Accueil et orientation

- Lire le premier écran, puis les besoins, métiers, méthode et territoire.
- Ouvrir les liens maintenance, métiers et contact dans le contexte de prévisualisation autorisé.
- Attendre les bons contenus, sans réalisation fictive.

## Maintenance

- Lire les trois rythmes 2, 4 et 12 visites, leurs limites, exclusions et conditions.
- Ouvrir le lien de demande ; attendre la page Contact.
- Ne pas transformer ces propositions en contrats actifs ni ajouter de tarif ou délai garanti.

## Contact

- Retrouver les coordonnées corrigées et les champs de qualification.
- Vérifier le formulaire natif, sa destination et son message de confirmation si sa configuration est possible.
- Retrouver exactement six choix après « Choisir une prestation » : Essentiel 2 visites, Suivi 4 visites, Continuité 12 visites, maintenance à définir, Travaux TCE et Intervention ponctuelle.
- Vérifier l’absence d’options génériques, l’inscription aux e-mails décochée et la persistance après avoir quitté puis rouvert Contact.
- Tester les choix de prestation et la saisie locale sans déclencher « Envoyer ma demande » ; ne pas prétendre vérifier la délivrabilité.
- Ne pas envoyer de test externe sans autorisation.

## Nettoyage du site vitrine

- Retirer le panier et l’action de réservation de l’en-tête.
- Masquer la boutique et les éléments de commerce non pertinents, sans supprimer leur contenu ni leurs données.
- Préserver les parties pertinentes : prestations, présentation, contact et informations légales.

## Affichage et enregistrement

- Contrôler les six pages au bureau et sur mobile, avec un seul H1, des marges cohérentes et aucun contenu tronqué.
- Contrôler les images, leurs légendes et les boutons ; les illustrations ne sont pas des références de chantier.
- Contrôler la largeur téléphone native, puis un rendu de contrôle à 375 px sans publier les brouillons.
- Vérifier deux cas limites : texte long dans le formulaire sans transmission ; retour téléphone → bureau sans image aplatie ni contenu masqué.
- Enregistrer les modifications et vérifier leur persistance, puis relire l’état désactivé des six pages.
- Ne pas activer les pages, changer les DNS, pousser vers le dépôt public ou déployer sur Vercel sans accord distinct.

## Prévisualisation statique associée

- Rejouer les six pages, menu mobile, accordéons, choix de formule, validation et récapitulatif local.
- Le courriel corrigé doit apparaître dans les coordonnées et les liens de messagerie.
- Vérifier vide et courriel invalide ; vérifier une longue demande sur mobile.
- Ouvrir la version privée redéployée dans un contexte neuf.

## Résultats de la dernière reprise

Les six pages ont une version unique de la CSS enregistrée et ont été retrouvées désactivées. Les douze vues natives bureau/téléphone sont relevées dans `docs/native-final-*.json` ; les douze rendus de copies DOM sans scripts à 375/1 440 px ne valent qu’un contrôle visuel complémentaire.

- **Réussis :** navigation authentifiée Accueil → Maintenance → Contact → Métiers, six choix au clavier, saisie longue de 2 040 caractères à 413 px sans débordement, puis champs de test effacés après réouverture.
- **Non vérifiés :** ouverture/fermeture du menu mobile natif dans le contexte visiteur, transmission réelle et réception de demande. La défaillance de Comet en aperçu plein écran ne remet pas en cause les styles déjà enregistrés mais empêche de valider le menu.
- **GitHub :** dépôt privé dédié créé et alimenté sur `main`, sans modification des anciens dépôts.
- **Hostinger :** préparation documentaire uniquement ; aucun transfert, déploiement ou changement DNS. Le formulaire autonome doit encore être relié à un traitement réel.
