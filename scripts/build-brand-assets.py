"""Construit les logos GROUPE ATC à partir des fichiers ANELEC fournis.

Seul le texte change : « ANELEC / GROUPE » devient « GROUPE / ATC ».
- Le symbole coloré, le soulignement et le petit carré sont repris du SVG original.
- Les lettres proviennent du lettrage original (PNG 2000 px) : « GROUPE » est
  recopié tel quel, « A » et « C » sont repris d'« ANELEC » ; le « T » est
  construit avec le fût, la barre et les empattements du « E » d'origine.
- Le lettrage est vectorisé (potrace) : aucun raster n'est intégré au SVG.

Dépendances : pip install numpy pillow potracer
Rendu PNG : node scripts/render-logos.mjs
"""
from pathlib import Path
import re
import xml.etree.ElementTree as ET

import numpy as np
import potrace
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "site" / "assets"
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)

# 1. Masque d'encre du lettrage d'origine (sans l'ombre portée grise)
src = np.array(Image.open(ASSETS / "anelec-original.png").convert("RGBA")).astype(float)
lum = src[:, :, :3].mean(2)
ink = np.clip((175 - lum) / 150, 0, 1) * src[:, :, 3] / 255
ink[ink < 0.04] = 0

Y0, Y1 = 828, 990            # ligne 1 d'origine (ANELEC)
L2 = 195                     # décalage vertical entre les deux lignes
A = ink[Y0:Y1, 745:901].copy()
E = ink[Y0:Y1, 1045:1180].copy()
C = ink[Y0:Y1, 1424:1575].copy()

# 2. Construction du T à partir du E
H, W = E.shape
s0, s1, c = 19, 42, 31       # fût du E et son axe
sub = E[:, c:]
mask = np.zeros_like(sub, bool)
mask[:23, :] = True          # barre supérieure
mask[:80, 100 - c:] = True   # bec de la barre supérieure
R = np.delete(sub * mask, range(22, 44), axis=1)
Wr = R.shape[1]
T = np.zeros((H, 2 * Wr))
T[:, Wr:] = R
T[:, :Wr] = np.maximum(T[:, :Wr], R[:, ::-1])
stem = E[:, s0:s1 + 1]
off = Wr - (c - s0)
T[:, off:off + stem.shape[1]] = np.maximum(T[:, off:off + stem.shape[1]], stem)
foot = E[118:, :c]
T[118:, Wr - c:Wr] = np.maximum(T[118:, Wr - c:Wr], foot)
T[118:, Wr:Wr + c] = np.maximum(T[118:, Wr:Wr + c], foot[:, ::-1])
cols = np.nonzero(T.max(0) > 0.05)[0]
T = T[:, cols.min():cols.max() + 1]

# 3. Composition : GROUPE en ligne 1, ATC en ligne 2
canvas = np.zeros((2000, 2000))
canvas[Y0:Y1, 736:1600] = ink[Y0 + L2:Y1 + L2, 736:1600]
x, y = 748, Y0 + L2
for g in (A, T, C):
    h, w = g.shape
    canvas[y:y + h, x:x + w] = np.maximum(canvas[y:y + h, x:x + w], g)
    x += w + 12

# 4. Vectorisation (suréchantillonnage ×2, puis 2000 px -> viewBox 1500)
big = np.array(Image.fromarray((canvas * 255).astype("uint8"))
               .resize((4000, 4000), Image.BICUBIC)).astype(float) / 255
curves = potrace.Bitmap(big < 0.5).trace(turdsize=20, alphamax=1.0,
                                         opticurve=True, opttolerance=0.2)
k = 0.375
pt = lambda p: f"{p.x * k:.2f} {p.y * k:.2f}"
d = ""
for cv in curves:
    d += f"M{pt(cv.start_point)}"
    for sg in cv.segments:
        d += (f"L{pt(sg.c)}L{pt(sg.end_point)}" if sg.is_corner
              else f"C{pt(sg.c1)} {pt(sg.c2)} {pt(sg.end_point)}")
    d += "Z"

rows = np.nonzero(ink[1205:1235, 680:1590].mean(1) > 0.5)[0] + 1205
ux0 = np.nonzero(ink[1220, :1600] > 0.5)[0].min() * 0.75
uy0, uh = rows.min() * 0.75, (rows.max() + 1 - rows.min()) * 0.75

# 5. Symbole et carré repris du SVG d'origine, avec leurs clipPaths
root = ET.parse(ASSETS / "anelec-original.svg").getroot()
defs = {e.get("id"): e for e in root[0].iter() if e.get("id")}
keep = [root[i] for i in list(range(1, 12)) + [13]]
refs = lambda el: {i for e in el.iter() for v in e.attrib.values()
                   for i in re.findall(r"url\(#([^)]+)\)", v)}
need, todo = set(), set().union(*map(refs, keep))
while todo:
    i = todo.pop()
    if i not in need:
        need.add(i)
        todo |= refs(defs[i]) - need
top = [e for e in root[0] if e.get("id") in need]
assert all(e.tag.endswith("clipPath") for e in top)

def svg(viewbox, size):
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" width="{size[0]}" height="{size[1]}" '
           'role="img" aria-labelledby="atc-logo-title" data-original-mark="anelec" data-lettering="GROUPE ATC">',
           '<title id="atc-logo-title">GROUPE ATC</title>',
           '<desc>Symbole original ANELEC conservé ; seul le texte est remplacé par GROUPE ATC, dans le lettrage d’origine.</desc>',
           '<defs><filter id="ombre" x="-10%" y="-10%" width="120%" height="130%">'
           '<feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.18"/></filter>']
    out += [ET.tostring(e, encoding="unicode") for e in top]
    out.append("</defs>")
    out += [ET.tostring(g, encoding="unicode") for g in keep]
    out.append(f'<g filter="url(#ombre)" fill="#000"><path fill-rule="evenodd" d="{d}"/>'
               f'<rect x="{ux0:.2f}" y="{uy0:.2f}" width="{1203.75 - ux0:.2f}" height="{uh:.2f}"/></g>')
    out.append("</svg>\n")
    s = "\n".join(out)
    s = re.sub(r' xmlns:ns\d+="[^"]+"', "", s).replace(' xmlns="http://www.w3.org/2000/svg" id=', " id=")
    s = re.sub(r'<(\w+) xmlns="http://www.w3.org/2000/svg"', r"<\1", s)
    s = s.replace('<svg viewBox', '<svg xmlns="http://www.w3.org/2000/svg" viewBox')
    assert not re.search(r"href=|<script|data:image|<image", s)
    return s

(ASSETS / "logos").mkdir(exist_ok=True)
(ASSETS / "logos" / "groupe-atc-logo-carre.svg").write_text(svg("0 0 1500 1500", (2000, 2000)))
# Version recadrée (même dessin, marges retirées) pour l'en-tête du site
(ASSETS / "groupe-atc-logo.svg").write_text(svg("230 548 1020 400", (1020, 400)))
print("logos écrits")
