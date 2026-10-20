# Astro product shell (emit + convert)

## IR ↔ Astro

Portable emit writes **`.astro` from IR** (`emitAstro`); import parses dirty `.astro` back (`parseAstroToIr`):

```bash
pnpm compiler -- build --target=astro --force
pnpm compiler -- build --app=astro --force
pnpm compiler -- import --from=astro path/to/Component.astro
```

Output: `astro/demo/src/components/*.astro` and, when present, `web-astro` / `admin-astro` `src/components/*.astro`.

## Product convert (Nuxt → web-astro)

Markup-first without HTML duplication between static sections and orchestrators:

| Vue class | `.astro` | `*.island.tsx` |
|-----------|----------|----------------|
| static | full template markup (via IR) | - |
| island (interactive) | thin mount (`<Island client:load />`) | React UI (Astro SSRs it) |
| orchestrator (home/investor) | composes child `.astro` sections | `boot.island.tsx` - motion/rail only (`return null`) |

Locale pages render `views/home/index.astro` (SSR) inside `ShellNui` (nui + params). Interactive sections hydrate as islands; static sections stay Astro-only.

## Tests

| File | Covers |
|------|--------|
| `tests/emit-astro.test.ts` | IR → `.astro` goldens |
| `tests/import-astro.test.ts` | `.astro` → IR + dirty import |
| `tests/emit-all-matrix.test.ts` | `writeOutputs` for vue/react/solid/svelte/astro |
| `tests/migrate-astro-matrix.test.ts` | cross-frame migrate via Astro hub |
| `tests/migrate-svelte-matrix.test.ts` | vue/react/solid/svelte IR parity |
| `tests/convert-framework-matrix.test.ts` | admin/web → next\|solid\|svelte\|astro |

## Commands

```bash
make astro                      # → astro/demo
make web TARGET=astro           # convert + emit + web-astro dev
make admin TARGET=astro         # → admin-astro/
pnpm compiler -- convert web --target=astro --force
pnpm compiler -- build --app=astro --force
pnpm exec vitest run tests/emit-all-matrix.test.ts tests/migrate-astro-matrix.test.ts tests/convert-framework-matrix.test.ts
```

Locales on web: `en` / `pl` / `vn` (same `WEB_LOCALES` as Next/Solid/Svelte).

## Not the same as `docs/`

Tracked `@nucleify/docs` remains the documentation site. `web-astro` / `admin-astro` are convert outputs from Nuxt `web/` / `admin/`.

## Templates

- `compiler/templates/astro/demo/`
- `compiler/templates/web-astro/`
- `compiler/templates/admin-astro/`
