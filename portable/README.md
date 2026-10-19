# Portable

Shared **NUI** wiring for product shells — tokens, fonts, and Lit `nui-*` registration.

No demo components and no compiler golden fixtures live here. Authoring `*.nuc.tsx` and emit
goldens for tests live under `compiler/tests/fixtures/` (and optional future authoring trees).

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

## Product shells

Coverage story for marketing and docs: **Vue · React · Nuxt · Next · Astro · Svelte · Solid** (seven shells, one nucleus — not React/Next-only or Vue/Nuxt-only).

| Command | What it is | Default |
|---------|------------|---------|
| `make web` | Landing product shell | **Nuxt** (`TARGET=nuxt`) |
| `make web TARGET=next` | Landing on Next | `web-next/` |
| `make web TARGET=solid` | Landing on Solid | `web-solid/` |
| `make web TARGET=svelte` | Landing on Svelte | `web-svelte/` |
| `make web TARGET=astro` | Landing on Astro (React islands) | `web-astro/` |
| `make admin` | Admin product shell | **Nuxt** |
| `make admin TARGET=next` | Admin on Next | `admin-next/` |
| `make admin TARGET=solid` | Admin on Solid | `admin-solid/` |
| `make admin TARGET=svelte` | Admin on Svelte | `admin-svelte/` |
| `make admin TARGET=astro` | Admin on Astro (React islands) | `admin-astro/` |
| `make docs` | Docs product shell | **Astro** (`@nucleify/docs`, not `web-astro/`) |
| `make nuxt` / `next` / `vue` / `react` / `solid` / `svelte` / `astro` | Throwaway emit demos | `{framework}/demo` (gitignored) |

**Product convert:** `convert` turns Nuxt Vue SFCs into Next (React), Solid, Svelte, or Astro (React islands) product trees. Output under `{product}-{framework}/` has **no source `.vue` files**.

```bash
make web TARGET=next      # → web-next/
make web TARGET=solid     # → web-solid/
make web TARGET=svelte    # → web-svelte/
make web TARGET=astro     # → web-astro/
make admin TARGET=next    # → admin-next/
make admin TARGET=solid   # → admin-solid/
make admin TARGET=svelte  # → admin-svelte/
make admin TARGET=astro   # → admin-astro/
```

Product shells import `portable/nui` for `--nui-*` tokens and Lit registration — they do not
duplicate palettes.

## Emit demos

```bash
make nuxt | next | vue | react | solid | svelte | astro
pnpm compiler:build
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
