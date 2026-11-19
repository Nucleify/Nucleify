# Portable

Shared **NUI** wiring for product hosts - tokens, fonts, and Lit `nui-*` registration.

No demo components and no compiler golden fixtures live here. Optional authoring `*.nuc.tsx` and emit
goldens for tests live under `compiler/tests/fixtures/` (and optional future authoring trees).
**Product convert does not require `*.nuc.tsx`.**

## Layout

```text
portable/
  nui/                 # tokens + fonts + register/theme
    tokens.css
    tokens.scss
    fonts.css
    register.ts
    theme.ts
    index.ts
    README.md
  README.md
```

## Product hosts

Coverage story for marketing and docs: **Vue · React · Nuxt · Next · Astro · Svelte · Solid** (seven frameworks, one nucleus - not React/Next-only or Vue/Nuxt-only).

| Command | What it is | Default |
|---------|------------|---------|
| `make web` | Landing product host | **Nuxt** (`--target=nuxt`) |
| `make web --target=next` | Landing on Next | `web_next/` |
| `make web --target=solid` | Landing on Solid | `web_solid/` |
| `make web --target=svelte` | Landing on Svelte | `web_svelte/` |
| `make web --target=astro` | Landing on Astro (React islands) | `web_astro/` |
| `make admin` | Admin product host | **Nuxt** |
| `make admin --target=next` | Admin on Next | `admin_next/` |
| `make admin --target=solid` | Admin on Solid | `admin_solid/` |
| `make admin --target=svelte` | Admin on Svelte | `admin_svelte/` |
| `make admin --target=astro` | Admin on Astro (React islands) | `admin_astro/` |
| `make docs` | Docs product host | **Astro** (`@nucleify/docs`, not `web_astro/`) |
| `make nuxt` / `next` / `vue` / `react` / `solid` / `svelte` / `astro` | Throwaway emit demos | `{framework}/demo` (gitignored) |

**Product convert:** `convert` turns existing framework source into Next (React), Solid, Svelte, or Astro (React islands) product trees. Output under `{product}-{framework}/` has **no source `.vue` files**.

```bash
export PATH="$PWD/.config/bin:$PATH"
make web --target=next      # → web_next/
make web -t=solid           # → web_solid/
make web --target=svelte    # → web_svelte/
make web --target=astro     # → web_astro/
make admin --target=next    # → admin_next/
make admin --target=solid   # → admin_solid/
make admin --target=svelte  # → admin_svelte/
make admin --target=astro   # → admin_astro/
# classic (no shim): make web TARGET=next
```

Product hosts import `portable/nui` for `--nui-*` tokens and Lit registration - they do not
duplicate palettes.

## Emit demos (optional portable UI)

```bash
make nuxt | next | vue | react | solid | svelte | astro
nuc emit build
# monorepo: pnpm compiler:build
```

| Emit demo | Output (gitignored) |
|-----------|---------------------|
| Vue | `vue/demo/src/components/` |
| React | `react/demo/src/components/` |
| Nuxt | `nuxt/demo/components/` |
| Next | `next/demo/src/components/` |
| Solid | `solid/demo/src/components/` |
| Svelte | `svelte/demo/src/lib/components/` |
| Astro | `astro/demo/src/components/` (React islands) |

Templates: `compiler/templates/{vue,react,nuxt,next,solid,svelte,astro}/{demo,…}`.
Compiler test fixtures: `compiler/tests/fixtures/{source,ir,emit}/`.
