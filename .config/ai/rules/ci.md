# CI / Hooks

## Pre-commit & Pre-push (Husky)

Both hooks run `.config/bash/hook-checks.sh` which executes in order:

1. `php .pest/guard_check.php` — verifies all test files have `PEST_RUNNING` guard
2. `./vendor/bin/pint` — PHP code style
3. `pnpm run check` — Biome lint
4. `pnpm run typeslint` — `tsc --noemit`
5. `pnpm run slint` — Stylelint SCSS
6. `pnpm run tests` — Vitest

## GitHub Actions

### `laravel.yml` (all branches)

PHP 8.3, SQLite, `.env.test.example`. Jobs (parallel after setup):
- **pint** — `./vendor/bin/pint`
- **guard-check** — `php .pest/guard_check.php`
- **test** — `./vendor/bin/pest -c .config/phpunit.xml --coverage` (SQLite, `DB_FOREIGN_KEYS=false`)

### `nuxt.yml` (all branches)

Node 20, cached `node_modules`. Jobs (parallel after setup):
- **biome** — `pnpm run check`
- **typeslint** — `pnpm run typeslint`
- **stylelint** — `pnpm run slint`
- **build** — `pnpm run build`
- **test** — `pnpm run tests`

### `release-modules.yml`

Triggered on changes to `modules/nuc_*`. Detects unreleased versions from `config.json` and creates GitHub releases.
