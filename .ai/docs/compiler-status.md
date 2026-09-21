# Compiler + convert status

## Paths (Tryb B)

| Command | Output (gitignored) |
|---------|---------------------|
| `pnpm compiler -- convert web --target=next` | `web-next/` |
| `pnpm compiler -- convert admin --target=next` | `admin-next/` |
| `make web TARGET=next` | same as convert web |

Flat `{product}-next/` at repo root (not `next/web`).

## Emit demos (Tryb A)

| Command | Output (gitignored) |
|---------|---------------------|
| `make vue` / `react` / `nuxt` / `next` / `solid` | `{framework}/demo` |

Solid (Faza 12): `emitSolid` → `createSignal` / `createMemo`, JSX `class`, `make solid`.

## DoD v1

| Item | Status |
|------|--------|
| Golden fixtures (incl. counter) + emit tests | done |
| Dirty / import Vue+React + CI check/build | done |
| Solid emit + demo scaffold | done (this batch) |

## Now

**Faza 12+ continued** — Svelte next, then Astro islands.

## Verify

```bash
pnpm compiler:test
pnpm compiler:check
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
make solid   # optional smoke
```
