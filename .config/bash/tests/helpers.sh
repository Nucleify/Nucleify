#!/usr/bin/env bash
set -euo pipefail

TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# tests/ -> bash -> .config -> monorepo
REPO_ROOT="$(cd "$TEST_DIR/../../.." && pwd)"
TMP_DIRS=()

cleanup_tmp_dirs() {
  local dir
  for dir in "${TMP_DIRS[@]}"; do
    rm -rf "$dir"
  done
}

trap cleanup_tmp_dirs EXIT

assert_equals() {
  local expected="$1"
  local actual="$2"
  local message="$3"
  if [[ "$expected" != "$actual" ]]; then
    printf "assert_equals failed: %s\n" "$message"
    printf "  expected: %s\n" "$expected"
    printf "  actual:   %s\n" "$actual"
    return 1
  fi
  return 0
}

assert_contains() {
  local haystack="$1"
  local needle="$2"
  if [[ "$haystack" != *"$needle"* ]]; then
    printf "assert_contains failed\n"
    printf "  missing fragment: %s\n" "$needle"
    return 1
  fi
  return 0
}

with_tmp_root() {
  local name="$1"
  local tmp_root
  tmp_root="$(mktemp -d "/tmp/nucleify-${name}.XXXXXX")"
  TMP_DIRS+=("$tmp_root")
  cp -R "$REPO_ROOT/.config" "$tmp_root/.config"
  printf "%s" "$tmp_root"
}
