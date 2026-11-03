#!/usr/bin/env bash
# Produit une copie du site consultable hors ligne (double-clic sur index.html).
# Usage : bash scripts/build-local.sh [dossier-de-sortie]
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="${1:-dist-local}"; NAME=groupe-atc-site-local
node build.mjs >/dev/null
rm -rf "$OUT" && mkdir -p "$OUT" && cp -r site "$OUT/$NAME"
cd "$OUT/$NAME"
rm -f .htaccess robots.txt
for f in *.html; do
  sed -i -E 's#(href|src|srcset)="/"#\1="./index.html"#g; s#(href|src|srcset)="/([^/"])#\1="./\2#g; s#<link rel="preload"[^>]*woff2"[^>]*>##g' "$f"
done
printf '%s\n' "Version locale du site GROUPE ATC (aperçu, non publié)" "" \
 "1. Décompressez ce dossier." "2. Double-cliquez sur index.html : le site s'ouvre dans votre navigateur." \
 "Toutes les pages, images et polices fonctionnent sans Internet." "" \
 "Remarque : l'envoi du formulaire de contact ne fonctionne qu'une fois le site en ligne." > LISEZ-MOI.txt
cd .. && rm -f "$NAME.zip" && zip -qr "$NAME.zip" "$NAME" && echo "$OUT/$NAME.zip"
