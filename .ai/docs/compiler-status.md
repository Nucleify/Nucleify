# Compiler + convert status

## Paths (product convert)

| Command | Output (gitignored) |
|---------|---------------------|
| `pnpm compiler -- convert web --target=next` | `web-next/` |
| `pnpm compiler -- convert admin --target=next` | `admin-next/` |
| `pnpm compiler -- convert web --target=solid` | `web-solid/` |
| `pnpm compiler -- convert admin --target=solid` | `admin-solid/` |
| `make web TARGET=next` / `TARGET=solid` | convert + install + dev |
| `make admin TARGET=next` / `TARGET=solid` | same for admin |

Solid product convert: Vue SFC → React emit → `reactTsxToSolidBody` (signals/memos unwrapped, `useRef`/`useParams`/`useReactive` shims in shell). Complex Next/React-only APIs still need follow-up; `web-solid` vite build smoke-passes.

## Emit demos (portable)

| Command | Output (gitignored) |
|---------|---------------------|
| `make vue` / `react` / `nuxt` / `next` / `solid` | `{framework}/demo` |

Portable emit targets: **Vue + React + Solid** (+ shared CSS). Product siblings next to `*.nuc.tsx` remain Vue/React; Solid lands in `solid/demo` (and product shells via convert).

## Now

Faza 12+ — Solid portable emit complete; product convert polish + Svelte next.

## Verify

```bash
pnpm compiler:test
# Solid portable demo smoke:
pnpm exec tsx compiler/src/cli.ts scaffold solid
pnpm exec tsx compiler/src/cli.ts build --app=solid --force
cd solid/demo && pnpm install --ignore-workspace && pnpm run --ignore-workspace build
# Product convert (optional):
pnpm compiler -- convert admin --target=solid --force
make admin TARGET=solid
```
