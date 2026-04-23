#!/usr/bin/env bash
set -euo pipefail

TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CASES_DIR="$TEST_DIR/cases"
. "$TEST_DIR/../utils/colors.sh"

PASS_COUNT=0
FAIL_COUNT=0

echo "Running bash tests..."

run_test_file() {
  local file="$1"
  local name
  name="$(basename "$file" .sh)"

  if bash "$file"; then
    log_success "$name"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    log_warn "$name"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

for file in "$CASES_DIR"/*.sh; do
  run_test_file "$file"
done

printf "${BOLD}${CYAN}Passed:${NC} %s\n" "$PASS_COUNT"
printf "${BOLD}${CYAN}Failed:${NC} %s\n" "$FAIL_COUNT"
echo

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  exit 1
fi
