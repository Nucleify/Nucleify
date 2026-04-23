#!/usr/bin/env bash
set -euo pipefail

TEST_CASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$TEST_CASE_DIR/../helpers.sh"

. "$REPO_ROOT/.config/bash/utils/print_separator.sh"

output="$(print_separator; printf 'END')"
expected=$'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\nEND'

assert_equals "$expected" "$output" "print_separator should print separator and a trailing blank line"
