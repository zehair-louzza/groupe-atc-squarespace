# Marque GROUPE ATC — logos et documentation

Dossier de référence pour l'identité visuelle de **GROUPE ATC** (GROUPE ANELEC TECHNIQUE ET CONCEPTE), même société qu'ANELEC.

## Contenu

| Dossier | Contenu |
|---|---|
| `logos/originaux-anelec/` | Fichiers fournis à l'origine (`logos-ANELEC.png`, `Logos-ANELEC.svg`). À conserver tels quels. |
| `logos/groupe-atc/` | Logos GROUPE ATC : version carrée (SVG + PNG 2000 px transparent), version horizontale recadrée (SVG + PNG 2040 px et 510 px), symbole seul. |
| `documentation/` | Charte graphique et maquette de référence du site. |

## Quel fichier utiliser

- **Impression, documents, devis** : `groupe-atc-logo-carre.svg` (vectoriel, net à toute taille).
- **Réseaux sociaux, messagerie, Word** : `groupe-atc-logo-carre.png` (fond transparent).
- **Site web, en-têtes, signatures de courriel** : `groupe-atc-logo-horizontal.svg` ou le PNG horizontal.
- **Favicon, petit format** : `groupe-atc-symbole.svg`.

## Régénérer les logos

```bash
pip install numpy pillow potracer
python3 scripts/build-brand-assets.py   # SVG
node scripts/render-logos.mjs           # PNG
```

Puis recopier les fichiers produits dans `marque/logos/groupe-atc/` si besoin.
Voir `documentation/charte-graphique.md` pour les couleurs, polices et règles d'usage.
