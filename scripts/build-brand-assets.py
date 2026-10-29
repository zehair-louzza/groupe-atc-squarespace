"""Derive GROUPE ATC artwork from the user-supplied ANELEC vector mark.

Only the original coloured symbol is copied. Old lettering and embedded raster
effects are not used. New lettering is outlined for portable exact rendering.
"""
from copy import deepcopy
from pathlib import Path
import re
import xml.etree.ElementTree as ET

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "site" / "assets"
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)

source = ET.parse(ASSETS / "anelec-original.svg").getroot()
symbol_nodes = [deepcopy(n) for n in list(source)[1:12]]
assert len(symbol_nodes) == 11
assert {p.get("fill") for n in symbol_nodes for p in n.iter()
        if p.tag.endswith("path")} == {"#ffde59", "#ff5757", "#00bf63"}

definitions = {n.get("id"): n for n in source.find(f"{{{NS}}}defs")}
needed = set()

def require_references(nodes):
    for node in nodes:
        for descendant in node.iter():
            for value in descendant.attrib.values():
                for identifier in re.findall(r"url\(#([^)]+)\)", value):
                    if identifier not in needed:
                        needed.add(identifier)
                        require_references([definitions[identifier]])

require_references(symbol_nodes)

def mark_defs():
    defs = ET.Element(f"{{{NS}}}defs")
    for identifier in sorted(needed):
        node = deepcopy(definitions[identifier])
        assert node.tag.endswith("clipPath")
        defs.append(node)
    return defs

font_path = Path("/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf")
if not font_path.exists():
    font_path = Path("/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf")
font = TTFont(font_path)
glyphs = font.getGlyphSet()
mapping = font.getBestCmap()
text = "GROUPE ATC"
advance = sum(glyphs[mapping[ord(c)]].width for c in text)
scale = 742 / advance

logo = ET.Element(f"{{{NS}}}svg", {
    "viewBox": "0 0 1050 250", "width": "2100", "height": "500",
    "role": "img", "aria-labelledby": "atc-logo-title",
})
ET.SubElement(logo, f"{{{NS}}}title", {"id": "atc-logo-title"}).text = text
ET.SubElement(logo, f"{{{NS}}}desc").text = (
    "Symbole original ANELEC conservé, lettrage remplacé par GROUPE ATC."
)
logo.append(mark_defs())
mark = ET.SubElement(logo, f"{{{NS}}}g", {
    "transform": "translate(20 20) scale(.6) translate(-237 -560)",
    "data-original-mark": "anelec",
})
for node in symbol_nodes:
    mark.append(deepcopy(node))
lettering = ET.SubElement(logo, f"{{{NS}}}g", {
    "fill": "#000000", "aria-label": text, "data-lettering": text,
    "transform": f"translate(242 158) scale({scale:.9f} {-scale:.9f})",
})
x = 0
for character in text:
    glyph = glyphs[mapping[ord(character)]]
    pen = SVGPathPen(glyphs)
    glyph.draw(pen)
    path = pen.getCommands()
    if path:
        ET.SubElement(lettering, f"{{{NS}}}path", {
            "d": path, "transform": f"translate({x} 0)",
        })
    x += glyph.width
ET.SubElement(logo, f"{{{NS}}}path", {
    "d": "M238 199H1000", "stroke": "#000000", "stroke-width": "4",
})
ET.SubElement(logo, f"{{{NS}}}rect", {
    "x": "990", "y": "187", "width": "24", "height": "24", "fill": "#000000",
})

icon = ET.Element(f"{{{NS}}}svg", {
    "viewBox": "230 552 320 356", "width": "320", "height": "356",
})
ET.SubElement(icon, f"{{{NS}}}title").text = "Symbole GROUPE ATC"
icon.append(mark_defs())
for node in symbol_nodes:
    icon.append(deepcopy(node))

for filename, document in [("groupe-atc-logo.svg", logo), ("groupe-atc-mark.svg", icon)]:
    serialized = ET.tostring(document, encoding="unicode")
    assert "<script" not in serialized and "href=" not in serialized
    assert "data:image" not in serialized
    ET.ElementTree(document).write(ASSETS / filename, encoding="utf-8", xml_declaration=True)
    print(f"{filename}: {len(serialized)} characters; no external resources")
