# Compiler leftovers (#698 / #697 / #696)

## IR version (#698)

- `IR_VERSION` in `compiler/src/ir/types.ts` is the single source of truth.
- Schema + parsers + `fixtures/ir/*.json` must match (`compiler/tests/ir-version.test.ts`).
- Breaking IR → bump version + migrate fixtures in the same PR (see `compiler/PORTABLE.md`).

## Husky / check

Pre-commit already runs `compiler:check` (and `compiler:test` / `compiler:convert:check`) via `.config/bash/hook-checks.sh`.

Skip hooks when needed:

```bash
HUSKY=0 git commit -m "…"   # skip all husky hooks
SKIP_COMPILER=1 make setup  # skip codegen on bootstrap
```

## Barrels (#697)

`compiler/tests/barrel-no-nuc.test.ts` scans package barrels — no `*.nuc.tsx` import/export.

Product smoke (manual / CI):

```bash
pnpm compiler:check
pnpm compiler:test
make web                  # Nuxt product
make vue / make solid / make svelte   # portable emit demos
```

## Product convert polish (#696)

| Item | Status |
|------|--------|
| `web\|admin` → `next\|solid\|svelte` (CI) | done |
| External `--path` / `--git` + `--out` | done |
| Docs Astro → next/solid/svelte | **deferred** (explicit error) |
| Portable vs convert docs | README + this note |
| Template pin / ignore-workspace | documented in README |

```bash
pnpm compiler -- convert web --target=next --path=./other-nuxt --out=other-next --force
pnpm compiler -- convert admin --target=solid --git=https://… --out=fork-admin-solid --force
pnpm compiler -- convert web --target=svelte --path=./other-nuxt --out=other-svelte --force
```
