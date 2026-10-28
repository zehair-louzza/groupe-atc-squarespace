# GROUPE ATC : état d’intégration dans Squarespace

Compte rendu du 28 octobre 2026, après votre autorisation de créer six brouillons désactivés et d’afficher le nom GROUPE ATC. Les textes sont effectivement enregistrés dans le site Squarespace existant ; la mise en page graphique complète du nouveau site et sa publication ne sont pas achevées.

## Identité et site conservés

- **Nom affiché :** GROUPE ATC remplace le titre générique dans l’en-tête et le titre du site.
- **Intitulé complet :** GROUPE ANELEC TECHNIQUE ET CONCEPTE, avec l’orthographe demandée, figure dans les nouveaux contenus de présentation.
- **Relation entre les marques :** ANELEC est présentée comme l’ancienne appellation, sans invention de filiale ou de holding.
- **Domaine final demandé :** anelecgroupe.com reste la cible ; aucun changement de domaine ou de DNS n’a été effectué.

L’intégration est réalisée dans [l’éditeur Squarespace du site existant](https://mandolin-jaguar-flrs.squarespace.com/config/pages). Ce lien est un accès d’administration nécessitant votre session Squarespace, pas une nouvelle adresse de site public.

## Six pages enregistrées

Les six pages sont rangées dans Hors navigation et le paramètre « Activer la page » est désactivé pour chacune. Le préfixe `/groupe-atc-` permet de préparer le nouveau contenu sans remplacer les anciennes pages ni leurs adresses.

| Page dans Squarespace | Adresse du brouillon | Contenu enregistré | État |
|---|---|---|---|
| GROUPE ATC \| Accueil | `/groupe-atc-accueil` | Positionnement, prestations, méthode, territoire et contacts. | Désactivée |
| GROUPE ATC \| Maintenance | `/groupe-atc-maintenance` | Trois propositions, visites, périmètre, exclusions et conditions. | Désactivée |
| GROUPE ATC \| Métiers | `/groupe-atc-metiers` | Travaux TCE, plomberie, électricité, serrurerie, rénovation et dépannage. | Désactivée |
| GROUPE ATC \| Groupe | `/groupe-atc-groupe` | Renommage, intitulé complet et approche de l’entreprise. | Désactivée |
| GROUPE ATC \| Contact | `/groupe-atc-contact` | Coordonnées et informations à réunir pour qualifier une demande. | Désactivée |
| GROUPE ATC \| Informations | `/groupe-atc-informations` | Informations de préparation et données à compléter avant publication. | Désactivée |

Les contenus sont saisis dans des blocs Markdown natifs placés dans des sections Fluid Engine. Il ne s’agit ni d’images de texte ni d’un site externe entier collé dans un bloc HTML ; cette première intégration reste toutefois éditoriale et ne reproduit pas encore toute la maquette graphique.

## Prestations et informations conservées

- **Maintenance :** Essentiel propose deux visites par an, Suivi quatre et Continuité douze ; base proposée d’un site, d’un technicien et de deux heures maximum par visite.
- **Conditions :** périmètre après audit, prix sur étude, exclusions écrites, compte rendu et organisation à valider ; aucune disponibilité permanente ni délai d’intervention garanti n’est inventé.
- **Téléphone :** 01 84 80 93 85, avec le numéro international +33184809385 dans les liens.
- **Adresse :** 9 RUE DES COLONNES, 75002 PARIS.
- **Courriel :** contact@aneleggroupe.com, conservé exactement comme communiqué et non corrigé par supposition.
- **Réalisations :** architecture de données conservée dans le code, liste vide et fonctionnalité désactivée ; aucun chantier ou logo client fictif ajouté.

Les formules restent des propositions commerciales à chiffrer et valider, pas des contrats déjà actifs. Le domaine de messagerie indiqué diffère de `anelecgroupe.com` et doit être confirmé avant la configuration du formulaire.

## Contrôles réalisés et limites

- **Persistance :** les six pages ont été ouvertes après enregistrement, avec le bon titre principal associé à chaque contenu.
- **Désactivation :** le paramètre « Activer la page » a été relu décoché dans les six fenêtres Général ; le simple classement Hors navigation n’est pas utilisé comme protection.
- **Identité :** GROUPE ATC a été confirmé dans l’en-tête après sortie de l’éditeur et dans le titre du document.
- **Navigation conservée :** Mentions légales, Boutique, Services, À propos, Contact et l’action Réserver restent inchangés ; aucune nouvelle page n’a été ajoutée au menu existant.
- **Structure bureau :** un titre principal par page et aucun débordement horizontal détecté sur les six pages.
- **Mobile partiel :** Accueil et Contact contrôlés dans la vue téléphone native, avec une largeur de document de 413 px ; aucun débordement horizontal ni dépassement du contenu Markdown hors de son bloc détecté.
- **Limite technique :** les captures de Comet échouent par expiration et le passage en vue mobile ne se stabilise pas pour Maintenance ; la réception visuelle native complète n’est donc pas déclarée réalisée.

La prévisualisation graphique distincte avait été contrôlée sur ses six pages, au bureau et sur mobile. Ses résultats ne doivent pas être confondus avec ceux de la construction native Squarespace, dont les quatre autres pages nécessitent encore un contrôle mobile final.

## Éléments qui restent à finaliser

- **Mise en page native :** reprendre les compositions de la maquette, les sections multiples, les espacements, les boutons, les images et les dispositions mobiles.
- **Direction graphique :** la palette indépendante des pièces ANELEC est préparée dans la prévisualisation ; les styles globaux du site existant n’ont pas été remplacés à cette étape.
- **Logos :** les fichiers ANELEC fournis sont conservés sans modification comme éléments historiques dans les sources et la prévisualisation ; aucun nouveau logo graphique GROUPE ATC n’est présenté comme validé et aucun bloc d’image n’a été ajouté dans ces six brouillons.
- **Formulaire :** créer le bloc natif, confirmer son destinataire, configurer le stockage et effectuer un envoi de test uniquement après autorisation ; aucun formulaire de collecte n’est actuellement actif dans les nouvelles pages.
- **Juridique et offre :** compléter les mentions obligatoires, la confidentialité et les conditions contractuelles, puis confirmer les moyens et tarifs des formules.
- **Publication :** décider des adresses finales, de la nouvelle navigation et de la page d’accueil, puis demander un accord distinct avant d’activer les pages.

Aucun bouton de publication n’a été utilisé et aucune des six nouvelles pages n’a été activée. Les anciennes pages n’ont pas été supprimées, les DNS et l’abonnement n’ont pas été modifiés, aucun nouveau contenu n’a été envoyé au dépôt GitHub distant et aucun déploiement Vercel n’a été lancé.
