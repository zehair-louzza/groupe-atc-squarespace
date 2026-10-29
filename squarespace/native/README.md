# GROUPE ATC : sources des brouillons Squarespace

Ces six textes ont été enregistrés dans des blocs Markdown natifs de sections Fluid Engine du site existant. Toutes les pages sont hors navigation et désactivées ; leurs adresses sont volontairement distinctes de celles des pages existantes.

| Fichier source | Titre dans Squarespace | Adresse du brouillon |
|---|---|---|
| `accueil.md` | GROUPE ATC \| Accueil | `/groupe-atc-accueil` |
| `maintenance.md` | GROUPE ATC \| Maintenance | `/groupe-atc-maintenance` |
| `metiers.md` | GROUPE ATC \| Métiers | `/groupe-atc-metiers` |
| `groupe.md` | GROUPE ATC \| Groupe | `/groupe-atc-groupe` |
| `contact.md` | GROUPE ATC \| Contact | `/groupe-atc-contact` |
| `informations.md` | GROUPE ATC \| Informations | `/groupe-atc-informations` |

Le nom de site est GROUPE ATC et l’intitulé complet est GROUPE ANELEC TECHNIQUE ET CONCEPTE, selon l’orthographe demandée. Le courriel confirmé est contact@anelecgroupe.com. Le formulaire natif est configuré sur la page Contact désactivée ; les formules de maintenance sont des propositions non activées et les mentions juridiques restent à compléter.

La composition native est enregistrée pour Accueil (4 sections), Maintenance (4), Métiers (5), Groupe (4), Contact (4) et Informations (5), soit 26 sections. Accueil possède une illustration native avec légende et texte alternatif ; Groupe possède le logo historique ANELEC conservé sans modification. Aucun de ces visuels n’est présenté comme une référence de chantier.

Le pied de page générique est remplacé par GROUPE ATC, l’intitulé complet et les coordonnées corrigées. La destination du bloc Form de Contact est configurée à contact@anelecgroupe.com ; l’option d’inscription aux e-mails a été décochée pendant le paramétrage et aucun envoi test n’a été effectué. Le fichier `layout.json` porte les trois sections Markdown de Contact ; sa quatrième section est un bloc Form distinct, créé dans l’éditeur. Aucun des six brouillons ne doit être activé sans accord distinct.

Les six choix du formulaire ont été corrigés selon `form-spec.json` puis relus après fermeture et réouverture de Contact ; Suivi est présent et les options génériques ont disparu. La destination correcte, l’inscription marketing décochée et le message post-envoi ont été relus dans l’éditeur. Aucun envoi de test n’a eu lieu ; la dernière révision CSS et la réception graphique complète des six pages restent à appliquer et vérifier après une nouvelle interruption de Comet.

`prepare-layout.mjs` produit `layout.json` à partir des contenus ; ce fichier décrit 25 sections prévues, sans prouver leur présence dans Squarespace. `design.css` est appliqué dans les paramètres avancés de chaque page ; les textes restent éditables dans les blocs natifs. Consulter le rapport d’intégration avant toute reprise.
