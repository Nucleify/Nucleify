#!/bin/sh

run_hook_checks() {
  php .pest/guard_check.php

  echo 'Pint checking...'
  ./vendor/bin/pint

  npm run check
  npm run typeslint
  npm run slint
  npm run tests
}
