# Compiler + convert status (2026-09-21)

## Paths (Tryb B)

| Command | Output (gitignored) |
|---------|---------------------|
| `pnpm compiler -- convert web --target=next` | `web-next/` |
| `pnpm compiler -- convert admin --target=next` | `admin-next/` |
| `make web TARGET=next` | same as convert web |

Old docs said `next/web` / `next/admin` — **wrong**. Flat `{product}-next/` at repo root.

## DoD v1

| Item | Status |
|------|--------|
| Golden fixtures (incl. counter) + emit tests | done |
| Dirty / import Vue+React + CI check/build | done |
| `compiler/README.md` paths | fixed (this batch) |
| Portable `*.nuc.tsx` demo **in product** (`web/`) | **open** |

## Housekeeping (this batch)

- Removed empty `web/src/pages/investor/sections/moat/`
- Aligned READMEs: `compiler`, `web`, `admin`, `portable`, templates
- Refreshed compiler roadmap footer so it no longer points at an already-finished phase

## Verify

```bash
pnpm -s compiler:check
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
