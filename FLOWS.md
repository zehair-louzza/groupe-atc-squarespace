# Parcours et réception de la finalisation native

## Carrousels photo par service

- Choix confirmé : un carrousel avec flèches pour chacun des six services, et non un défilement des services eux-mêmes.
- Conserver trois services par ligne sur ordinateur et une colonne sur téléphone, les dix-sept lignes de prestations et les six liens de contact préremplis.
- Dans la prévisualisation, parcourir les trois emplacements provisoires avec les flèches, revenir du dernier au premier et vérifier l'indépendance des six galeries.
- Au clavier, vérifier les flèches gauche/droite et Début/Fin, avec un focus visible ; au tactile, vérifier un balayage horizontal sans bloquer le défilement vertical.
- Pour zéro photo, afficher « Emplacement », jamais un nombre de chantiers. Pour une seule photo, désactiver les flèches ; pour plusieurs photos autorisées, afficher le compteur réel.
- Vérifier l'absence de défilement automatique, les textes alternatifs, une image défaillante, JavaScript désactivé et les douze rendus des six pages.
- Les photos réelles restent à fournir. La nouvelle fonction est préparée dans le site autonome ; ne pas modifier l'état constaté de Squarespace ni prétendre à une synchronisation distante non effectuée.

## Complétude de Services et zones photo

- Sur la page Services existante, retrouver six rubriques distinctes : Plomberie, Électricité, Serrurerie, Rénovation intérieure, Maçonnerie et Menuiserie.
- Reprendre les quinze prestations détaillées de la présentation et les deux métiers supplémentaires explicitement nommés page 2 du PDF, sans inventer leur détail.
- Prévoir six images natives remplaçables, identifiées comme emplacements de futures photos et non comme réalisations.
- Contrôler les six rubriques et leurs images au bureau et à 375 px, leur enregistrement puis leur réouverture.
- Dernière demande : trois services par ligne sur ordinateur, soit deux rangées, et une colonne sur mobile.
- Préserver la demande de contact existante, les coordonnées, la navigation et l’état des nouveaux brouillons ; aucun transfert Hostinger ni changement DNS.
- Synchroniser la page Métiers du site autonome et les sources du dépôt privé ; rejouer les parcours de prévisualisation existants et les six liens métier vers le contact.

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

## Ajustements du site vitrine

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

## Correction du périmètre métier

La dernière demande limite l’offre à la plomberie, l’électricité, la serrurerie et la rénovation/finitions intérieures. Retirer les spécialités non exercées des textes, exclusions conditionnelles, formulaires et descriptions ; les notes de recette ne doivent pas être présentées comme des prestations.

- **Sources :** vérifier les textes natifs, les gabarits HTML, la structure des sections et les documents commerciaux, puis reconstruire les six pages.
- **Squarespace :** corriger la phrase de la page Services existante et les exclusions de Maintenance ; parcourir aussi les autres pages, sans activer les six nouveaux brouillons.
- **Non-régression :** conserver les coordonnées, les trois fréquences proposées, les six choix natifs, les liens, les accordéons et le récapitulatif local sans envoi.
- **Publication :** aucun déploiement Hostinger/Vercel ni changement DNS ; le retrait ciblé sur la page Services existante ne vaut pas activation des nouvelles pages.

Les cinq tests automatisés et les douze affichages du site autonome passent après correction. Les six parcours du module de recette passent également, sans erreur JavaScript ni message transmis ; le menu natif Squarespace n’est pas concerné par ce résultat.

La reprise suivante a terminé et enregistré les deux corrections natives. Services contient huit champs actualisés selon la présentation ANELEC et Maintenance un périmètre limité aux quatre métiers ; la désactivation de Maintenance a été relue après sauvegarde, puis les deux pages rouvertes pour vérifier la persistance des textes.
