#!/bin/sh
set -e

SCRIPT_DIR="${RUN_HOOKS_DIR:-$(cd "$(dirname "$0")" && pwd)}"
. "$SCRIPT_DIR/hook-root.sh"
. "$SCRIPT_DIR/hook-checks.sh"

go_to_hook_root || exit 1
run_hook_checks
