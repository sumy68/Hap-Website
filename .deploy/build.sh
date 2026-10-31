#!/usr/bin/env bash
# Baut das Upload-Paket für den All-Inkl-Webspace: deploy/ und happiness-website.zip
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/deploy"
ZIP="$ROOT/happiness-website.zip"

# Auf keiner Seite sichtbar referenzierte Dateien (Originale, ausgeblendete Team-Fotos)
UNUSED_ASSETS='^assets/(about/handabdruecke\.png|about/hero-event\.(jpg|webp)|about/hero-(gruppe-original\.png|rot-original\.jpg)|about/mission\.jpg|events/cay-poster\.jpg|spenden/spende-1-rot-original\.jpg|team/.*)$'
REPO_ONLY='^(\.deploy/|\.gitignore$|README\.md$|CNAME$)'

cd "$ROOT"
rm -rf "$OUT" "$ZIP"
mkdir -p "$OUT"

git ls-files --cached --exclude-standard \
  | grep -Ev "$REPO_ONLY" \
  | grep -Ev "$UNUSED_ASSETS" \
  | while IFS= read -r file; do
      [ -f "$file" ] || continue
      mkdir -p "$OUT/$(dirname "$file")"
      cp "$file" "$OUT/$file"
    done

cp "$ROOT/.deploy/.htaccess" "$ROOT/.deploy/404.html" "$OUT/"

find "$OUT" -type d -exec chmod 755 {} +
find "$OUT" -type f -exec chmod 644 {} +

(cd "$OUT" && zip -qrX "$ZIP" .)
echo "Paket: $OUT ($(find "$OUT" -type f | wc -l | tr -d ' ') Dateien, $(du -sh "$OUT" | cut -f1))"
echo "ZIP:   $ZIP ($(du -h "$ZIP" | cut -f1))"
