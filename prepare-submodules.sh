#!/bin/sh
set -e

echo "~~~ Running prepare-submodules script ~~~"

export GIT_DISCOVERY_ACROSS_FILESYSTEM=1

NUC_SUBMODULES="
activity
admin
animations
api
auth
charts
colors
database
datatable
dialog
dock
documentation
entities
entities_structural
fields
files
friendship
globals
loading
media
modules
navigation
overrides
pages
performance
screen_lights
screen_loader
sections
settings
stores
tasks
templates
terminal
time
tooltip
"

for NAME in $NUC_SUBMODULES; do
  URL="https://github.com/Nucleify/nuc_$NAME.git"
  DIR="modules/nuc_$NAME"

  echo "Cloning submodule nuc_$NAME from $URL into $DIR..."
  git clone --depth=1 "$URL" "$DIR"
done

NEXT_URL="https://github.com/Nucleify/Nucleify-React-Next.git"
NEXT_DIR="next"

echo "Cloning submodule next from $NEXT_URL into $NEXT_DIR..."
git clone --depth=1 "$NEXT_URL" "$NEXT_DIR"

echo "~~~ prepare-submodules script finished ~~~"
