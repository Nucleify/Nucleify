#!/bin/sh

run_hook_checks() {
  php .config/pest/guard_check.php

  echo 'Pint checking...'
  ./vendor/bin/pint --config=.config/pint.json

  pnpm run check
  pnpm run typeslint
  pnpm run slint
  pnpm run tests
}
