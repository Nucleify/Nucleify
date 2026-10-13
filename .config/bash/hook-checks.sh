#!/bin/sh

run_hook_checks() {
  pnpm run btest
  pnpm run check
  pnpm run typeslint
  pnpm run slint
  pnpm run build
  pnpm run tests
  pnpm run compiler:test
  pnpm run compiler:check
  pnpm run compiler:convert:check
}
