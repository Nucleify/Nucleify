#!/usr/bin/env bash
set -euo pipefail

TEST_CASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$TEST_CASE_DIR/../helpers.sh"

root="$(with_tmp_root prepare-check)"
mkdir -p "$root/modules/nuc_demo" "$root/next" "$root/bin"
printf '{"version":"1.0.0"}\n' > "$root/modules/nuc_demo/config.json"
printf 'export default {}\n' > "$root/next/next.config.ts"
printf 'demo\n' > "$root/.config/bash/config/submodules.txt"

cat > "$root/bin/git" <<'EOF'
#!/bin/sh
if [ "$1" = "clone" ]; then
  echo "Cloning into '$7'..."
  echo "remote: done"
  printf "%s\n" "$*" >> "${TMP_GIT_LOG}"
  exit 0
fi
if [ "$1" = "ls-remote" ]; then
  exit 0
fi
if [ "$1" = "-C" ] && [ "$3" = "rev-parse" ]; then
  exit 0
fi
if [ "$1" = "-C" ] && [ "$3" = "config" ]; then
  exit 0
fi
exit 0
EOF
chmod +x "$root/bin/git"

git_log="$root/git.log"
: > "$git_log"

set +e
output="$(
  cd "$root" && PATH="$root/bin:$PATH" APP_ENV=production NUC_SUBMODULES_CHECK=1 TMP_GIT_LOG="$git_log" \
    sh ".config/bash/prepare-submodules.sh" 2>&1
)"
status=$?
set -e

assert_equals "0" "$status" "prepare-submodules exits with success in check mode"
assert_contains "$output" "Directory 'modules/nuc_demo' exists, skipping"
assert_contains "$output" "Directory 'next' exists, skipping"
assert_equals "" "$(cat "$git_log")" "git clone should not run in check mode"
