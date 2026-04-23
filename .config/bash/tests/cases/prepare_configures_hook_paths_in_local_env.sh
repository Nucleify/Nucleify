#!/usr/bin/env bash
set -euo pipefail

TEST_CASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$TEST_CASE_DIR/../helpers.sh"

root="$(with_tmp_root prepare-hooks)"
mkdir -p "$root/bin" "$root/.husky"
printf 'demo\n' > "$root/.config/bash/config/submodules.txt"

cat > "$root/bin/git" <<'EOF'
#!/bin/sh
if [ "$1" = "ls-remote" ]; then
  exit 0
fi
if [ "$1" = "clone" ]; then
  echo "Cloning into '$7'..."
  echo "remote: done"
  mkdir -p "$7"
  exit 0
fi
if [ "$1" = "-C" ] && [ "$3" = "rev-parse" ]; then
  exit 0
fi
if [ "$1" = "-C" ] && [ "$3" = "config" ] && [ "$4" = "core.hooksPath" ]; then
  printf "configured:%s->%s\n" "$2" "$5"
  exit 0
fi
exit 0
EOF
chmod +x "$root/bin/git"

set +e
output="$(
  cd "$root" && PATH="$root/bin:$PATH" APP_ENV=local \
    sh ".config/bash/prepare-submodules.sh" 2>&1
)"
status=$?
set -e

assert_equals "0" "$status" "prepare-submodules exits with success in local env"
assert_contains "$output" "configured:$root/next->$root/.husky"
assert_contains "$output" "configured:$root/modules/nuc_demo->$root/.husky"
