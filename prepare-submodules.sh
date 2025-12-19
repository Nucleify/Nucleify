#!/bin/sh
set -e

echo "~~~ Running prepare-submodules script ~~~"

export GIT_DISCOVERY_ACROSS_FILESYSTEM=1

SUBMODULES="nuc_activity nuc_admin nuc_animations nuc_api"

for NAME in $SUBMODULES; do
  URL="https://github.com/Nucleify/$NAME.git"
  DIR="modules/$NAME"

  echo "Cloning submodule $NAME from $URL into $DIR..."
  git clone --depth=1 "$URL" "$DIR"
done

echo "Removing .git folders from submodules..."
rm -rf modules/**/.git

echo "~~~ prepare-submodules script finished ~~~"
