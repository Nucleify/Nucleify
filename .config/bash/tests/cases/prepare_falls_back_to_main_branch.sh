#!/usr/bin/env bash
set -euo pipefail

TEST_CASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$TEST_CASE_DIR/../helpers.sh"

root="$(with_tmp_root prepare-branch)"
mkdir -p "$root/bin"
printf 'demo\n' > "$root/.config/bash/config/submodules.txt"

cat > "$root/bin/git" <<'EOF'
#!/bin/sh
if [ "$1" = "ls-remote" ]; then
  branch="$4"
  if [ "$branch" = "main" ]; then
    exit 0
  fi
  exit 2
fi
if [ "$1" = "clone" ]; then
  echo "Cloning into '$7'..."
  echo "remote: done"
  printf "%s\n" "$*" >> "${TMP_GIT_LOG}"
  mkdir -p "$7"
  exit 0
fi
if [ "$1" = "-C" ] && [ "$3" = "rev-parse" ]; then
  exit 1
fi
exit 0
EOF
chmod +x "$root/bin/git"

git_log="$root/git.log"
: > "$git_log"

set +e
output="$(
  cd "$root" && PATH="$root/bin:$PATH" APP_ENV=production NUC_SUBMODULES_BRANCH=feature-x TMP_GIT_LOG="$git_log" \
    sh ".config/bash/prepare-submodules.sh" 2>&1
)"
status=$?
set -e

assert_equals "0" "$status" "prepare-submodules exits with success when branch fallback is used"
assert_contains "$(cat "$git_log")" "--branch main"
assert_contains "$output" "Branch 'feature-x' not found, using 'main'"
