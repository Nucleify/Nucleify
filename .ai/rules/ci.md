# CI / Hooks

## Pre-commit & Pre-push (Husky)

Both hooks run `.bash/hook-checks.sh` which executes in order:

1. `php .pest/guard_check.php` — verifies all test files have `PEST_RUNNING` guard
2. `./vendor/bin/pint` — PHP code style
3. `npm run check` — Biome lint
4. `npm run typeslint` — `tsc --noemit`
5. `npm run slint` — Stylelint SCSS
6. `npm run tests` — Vitest

## GitHub Actions

### `laravel.yml` (all branches)

PHP 8.3, SQLite, `.env.test.example`. Jobs (parallel after setup):
- **pint** — `./vendor/bin/pint`
- **guard-check** — `php .pest/guard_check.php`
- **test** — `php artisan test --coverage` (SQLite, `DB_FOREIGN_KEYS=false`)

### `nuxt.yml` (all branches)

Node 20, cached `node_modules`. Jobs (parallel after setup):
- **biome** — `npm run check`
- **typeslint** — `npm run typeslint`
- **stylelint** — `npm run slint`
- **build** — `npm run build`
- **test** — `npm run tests`

### `release-modules.yml`

Triggered on changes to `modules/nuc_*`. Detects unreleased versions from `config.json` and creates GitHub releases.
