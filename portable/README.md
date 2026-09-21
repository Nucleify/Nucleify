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

| Command | What it is | Default |
|---------|------------|---------|
| `make web` | Landing product shell | **Nuxt** (`TARGET=nuxt`) |
| `make admin` | Admin product shell | **Nuxt** |
| `make admin TARGET=next` | Admin on Next (tryb B) | `admin-next/` |
| `make docs` | Docs product shell | **Astro** |
| `make nuxt` / `next` / `vue` / `react` / `solid` | Throwaway emit demos | `{framework}/demo` (gitignored) |

**Tryb B:** `convert` emits each Nuxt `.vue` to React `.tsx` (IR pipeline). Output under
`{product}-next/` has **no `.vue` files** — native Next App Router only.

```bash
make web TARGET=next     # → web-next/
make admin TARGET=next   # → admin-next/
```

Product shells import `portable/nui` for `--nui-*` tokens and Lit registration — they do not
duplicate palettes.

## Emit demos

```bash
make nuxt | next | vue | react | solid
pnpm compiler:build
```

| Emit demo | Output (gitignored) |
|-----------|---------------------|
| Vue | `vue/demo/src/components/` |
| React | `react/demo/src/components/` |
| Nuxt | `nuxt/demo/components/` |
| Next | `next/demo/src/components/` |
| Solid | `solid/demo/src/components/` |

Templates: `compiler/templates/{vue,react,nuxt,next,solid}/{demo,…}`.
Compiler test fixtures: `compiler/tests/fixtures/{source,ir,emit}/`.
