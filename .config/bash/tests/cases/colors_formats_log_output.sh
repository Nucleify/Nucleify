#!/usr/bin/env bash
set -euo pipefail

TEST_CASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$TEST_CASE_DIR/../helpers.sh"

. "$REPO_ROOT/.config/bash/utils/colors.sh"

assert_contains "$RED" '\033['
assert_contains "$GREEN" '\033['
assert_contains "$YELLOW" '\033['
assert_contains "$BLUE" '\033['
assert_contains "$CYAN" '\033['
assert_contains "$BOLD" '\033['
assert_contains "$NC" '\033['

info_output="$(log_info "info message")"
success_output="$(log_success "success message")"
warn_output="$(log_warn "warn message")"
error_output="$(log_error "error message")"
header_output="$(log_header "header message")"

assert_contains "$info_output" "ℹ"
assert_contains "$info_output" "info message"
assert_contains "$success_output" "✓"
assert_contains "$success_output" "success message"
assert_contains "$warn_output" "⚠"
assert_contains "$warn_output" "warn message"
assert_contains "$error_output" "✗"
assert_contains "$error_output" "error message"
assert_contains "$header_output" "▶"
assert_contains "$header_output" "header message"
