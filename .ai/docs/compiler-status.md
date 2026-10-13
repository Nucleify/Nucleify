# Compiler + convert status

## CI

Workflow: [`.github/workflows/compiler.yaml`](../../.github/workflows/compiler.yaml) (split out of health-check).

| Job | What |
|-----|------|
| `unit` | `compiler:test`, `compiler:check`, idempotent `compiler:build` |
| `emit` | matrix `vue` / `react` / `nuxt` / `next` / `solid` / `svelte` — scaffold + build + demo `pnpm build` |
| `convert` | matrix `web\|admin` × `next\|solid\|svelte` — convert + emit + product shell `pnpm build` |

Next shells need CSS module types for `portable/nui` (`fonts.css.d.ts` / `tokens.css.d.ts`, plus `nui-jsx.d.ts` in templates) so `next build` typechecks `theme.ts` font CSS imports.

React emit folds static CSS `style="…"` strings into style objects (SVG `<stop>` etc.). Product convert maps Vue `watch(() => expr, cb)` → `useEffect(cb, [expr])`, preserves `ref<T>` as `useState<T>`, and rewrites DOM `KeyboardEvent`/`MouseEvent` params to structural shapes React accepts.

Inline Vue `$event` in `@focus="x = $event"` becomes `onFocus={($event) => setX($event)}` (React/Solid). Matching uses `/\$event\b/` — not `\b\$event`, because `$` is non-word and `\b` fails after `(`. Prefer named handlers (`@focus="onCubeFocus"`) when the payload type matters.

Svelte portable emit is **Svelte 5 runes** (`.svelte` SFC): `$state` / `$derived` / `$props`, `{#if}` / `{#each}`, DOM events as `onclick`. Product convert: Vue template IR + script→React rewrite → runes (`react-hooks-to-svelte`) → `emitSvelteProduct`. Host is Vite SPA with history paths (`/en/home`, not hash); not SvelteKit yet. Portable import: `import --from=vue|react|solid|svelte` (`parseSolidToIr` / `parseSvelteToIr`). Solid↔Svelte migrate via IR hub (Solid demo `.tsx`, not a product sibling).

## Paths (product convert)

| Command | Output (gitignored) |
|---------|---------------------|
| `pnpm compiler -- convert web --target=next` | `web-next/` |
| `pnpm compiler -- convert admin --target=next` | `admin-next/` |
| `pnpm compiler -- convert web --target=solid` | `web-solid/` |
| `pnpm compiler -- convert admin --target=solid` | `admin-solid/` |
| `pnpm compiler -- convert web --target=svelte` | `web-svelte/` |
| `pnpm compiler -- convert admin --target=svelte` | `admin-svelte/` |
| `make web TARGET=next` / `TARGET=solid` / `TARGET=svelte` | convert + install + dev |
| `make admin TARGET=next` / `TARGET=solid` / `TARGET=svelte` | same for admin |

Solid product convert: Vue SFC → React emit → `reactTsxToSolidBody`. Svelte: Vue SFC → template IR + runes script → `.svelte`. Complex Vue/React-only APIs still need follow-up; smoke-build is the bar.

## Emit demos (portable)

| Command | Output (gitignored) |
|---------|---------------------|
| `make vue` / `react` / `nuxt` / `next` / `solid` / `svelte` | `{framework}/demo` |

Portable emit targets: **Vue + React + Solid + Svelte** (+ shared CSS). Product siblings next to `*.nuc.tsx`: Vue/React/Svelte; Solid stays in `solid/demo` (+ convert shells) and is importable with `--from=solid`.

## Now

Faza 13 — Svelte portable emit ([#694](https://github.com/Nucleify/Nucleify/issues/694): `emitSvelte`, runes, `svelte/demo`, `make svelte`, goldens, PORTABLE limits) + Tryb B SPA convert for web/admin (beyond #694’s original “product convert later”; still **not** SvelteKit SSR). Astro emit later.

## Verify

```bash
pnpm compiler:test
# Svelte portable demo smoke:
pnpm exec tsx compiler/src/cli.ts scaffold svelte
pnpm exec tsx compiler/src/cli.ts build --app=svelte --force
cd svelte/demo && pnpm install --ignore-workspace && pnpm run --ignore-workspace build
# Product convert:
pnpm compiler -- convert admin --target=svelte --force
pnpm compiler -- convert web --target=svelte --force
make admin TARGET=svelte
```
