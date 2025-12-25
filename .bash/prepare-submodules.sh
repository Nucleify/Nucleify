#!/bin/sh
set -e

echo "~~~~ Running prepare-submodules script ~~~~"

export GIT_DISCOVERY_ACROSS_FILESYSTEM=1

if [ -f .env ]; then
  echo
  echo "~ Loading environment variables from .env ~"
  set -a
  . ./.env
  set +a
fi

. ./.bash/utils/print_separator.sh

DEFAULT_BRANCH="main"
TARGET_BRANCH="${NUC_SUBMODULES_BRANCH:-$DEFAULT_BRANCH}"

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

  print_separator
  echo "Preparing nuc_$NAME..."
  echo

  if git ls-remote --exit-code --heads "$URL" "$TARGET_BRANCH" > /dev/null; then
    BRANCH="$TARGET_BRANCH"
  else
    echo "⚠️  Branch '$TARGET_BRANCH' not found in nuc_$NAME, falling back to '$DEFAULT_BRANCH'"
    echo
    BRANCH="$DEFAULT_BRANCH"
  fi

  git clone --depth=1 --branch "$BRANCH" "$URL" "$DIR"
done

NEXT_URL="https://github.com/Nucleify/Nucleify-React-Next.git"
NEXT_DIR="next"

print_separator
echo "Preparing next app..."
echo

if git ls-remote --exit-code --heads "$NEXT_URL" "$TARGET_BRANCH" > /dev/null; then
  BRANCH="$TARGET_BRANCH"
else
  echo "⚠️  Branch '$TARGET_BRANCH' not found in next app, falling back to '$DEFAULT_BRANCH'"
  BRANCH="$DEFAULT_BRANCH"
fi

echo

git clone --depth=1 --branch "$BRANCH" "$NEXT_URL" "$NEXT_DIR" || \


echo "~~~~ prepare-submodules script finished ~~~~"
