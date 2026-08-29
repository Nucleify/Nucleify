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
| `make docs` | Docs product shell | **Astro** |
| `make nuxt` / `next` / `vue` / `react` | Throwaway emit demos | `{framework}/demo` (gitignored) |

**Tryb B:** `make web TARGET=next` runs `convert`, which copies `web/` into `next/web/` and hosts
Vue SFCs via vue-loader under the Next App Router.

```bash
make web                 # Nuxt top-level web/
make web TARGET=next     # next/web
make next                # demo only → next/demo
```

Product shells import `portable/nui` for `--nui-*` tokens and Lit registration — they do not
duplicate palettes.

## Emit demos

```bash
make nuxt | next | vue | react
pnpm compiler:build
```

| Emit demo | Output (gitignored) |
|-----------|---------------------|
| Vue | `vue/demo/src/components/` |
| React | `react/demo/src/components/` |
| Nuxt | `nuxt/demo/components/` |
| Next | `next/demo/src/components/` |

Templates: `compiler/templates/{vue,react,nuxt,next}/{demo,web}/`.
Compiler test fixtures: `compiler/tests/fixtures/{source,ir,emit}/`.
