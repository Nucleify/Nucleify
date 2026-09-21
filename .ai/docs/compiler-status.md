# Compiler + convert status

## Paths (Tryb B)

| Command | Output (gitignored) |
|---------|---------------------|
| `pnpm compiler -- convert web --target=next` | `web-next/` |
| `pnpm compiler -- convert admin --target=next` | `admin-next/` |
| `pnpm compiler -- convert web --target=solid` | `web-solid/` |
| `pnpm compiler -- convert admin --target=solid` | `admin-solid/` |
| `make web TARGET=next` / `TARGET=solid` | convert + install + dev |
| `make admin TARGET=next` / `TARGET=solid` | same for admin |

Solid product convert: Vue SFC → React emit → `reactTsxToSolidBody` (best-effort). Complex Next/React-only APIs still need follow-up; admin stubs convert cleanly.

## Emit demos (Tryb A)

| Command | Output (gitignored) |
|---------|---------------------|
| `make vue` / `react` / `nuxt` / `next` / `solid` | `{framework}/demo` |

## Now

Faza 12+ — Solid emit + product convert (web/admin). Next: Svelte.

## Verify

```bash
pnpm compiler:test
pnpm compiler -- convert admin --target=solid --force
make admin TARGET=solid   # optional smoke
```
