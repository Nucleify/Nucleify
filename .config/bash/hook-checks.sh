#!/bin/sh

run_hook_checks() {
  pnpm run btest
  pnpm run check
  pnpm run typeslint
  pnpm run slint
  pnpm run tests
}
