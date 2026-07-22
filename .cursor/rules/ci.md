---
description: Husky hooks and GitHub Actions CI pipeline
globs: .github/**,.config/bash/**,package.json
alwaysApply: false
---

# CI / Hooks

## Pre-commit & Pre-push (Husky)

Both hooks run `.config/bash/hook-checks.sh`:

1. `pnpm btest` — bash test suite
2. `pnpm check` — Biome lint
3. `pnpm nuxt:typeslint` — `tsc` for Nuxt/Vue
4. `pnpm next:typeslint` — `tsc` for Next/React modules
5. `pnpm slint` — Stylelint (SCSS files)
6. `pnpm tests` — Vitest

## GitHub Actions

### `health-check.yml` (all branches)

Node 22, pnpm, recursive submodules. Jobs (parallel after setup):

- **biome** — `pnpm check`
- **nuxt-typeslint** — `pnpm nuxt:typeslint`
- **next-typeslint** — `pnpm next:typeslint`
- **stylelint** — `pnpm slint`
- **nuxt-build** — `pnpm nuxt:build`
- **next-build** — `pnpm next:build`
- **test** — `pnpm tests`

### `bash.yaml`

Runs `.config/bash/tests/run.sh` on push.

### `release-modules.yml`

On changes to `modules/nuc_*`: reads `config.json` version and creates GitHub releases for unreleased modules.
