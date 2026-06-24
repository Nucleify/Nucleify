#!/bin/sh

run_hook_checks() {
  pnpm run btest
  pnpm run check
  pnpm run nuxt:typeslint
  pnpm run next:typeslint
  pnpm run slint
  pnpm run tests
}
