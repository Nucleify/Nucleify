# Portable authoring

Committed sources for the compiler. Generated demo apps (`vue/`, `react/`, `nuxt/`, `next/`) are **gitignored** and rebuilt by Make.

## Product apps vs emit demos

| Command | What it is | Default |
|---------|------------|---------|
| `make root` | Landing product shell | **Nuxt** (`TARGET=nuxt`) |
| `make admin` | Admin product shell | **Nuxt** |
| `make docs` | Docs product shell | **Astro** (host today; `TARGET` reserved for later) |
| `make nuxt` / `next` / `vue` / `react` | Throwaway emit demos | scaffold + portable UI |

Multi-framework product shells (e.g. `make root TARGET=next`) are **planned** (compiler tryb B). Until then only `TARGET=nuxt` is implemented for `root` / `admin`; other values exit with a stub message.

```bash
make root                 # Nuxt (default)
make root TARGET=nuxt     # same
make root TARGET=next     # stub — not yet
make admin
SKIP_COMPILER=1 make setup
```

## Layout

```text
portable/
  hello.nuc.tsx          # authoring (discovered by build)
  nui_cta.nuc.tsx        # nucleify-ui attrs demo (style / boolean / aria-*)
  counter.nuc.tsx        # state / derived / handler (Faza 7)
  fixtures/
    source/              # golden *.nuc.tsx
    ir/                  # golden IR JSON
    emit/vue|react|css/  # golden emit snapshots
  README.md
```

## Emit demo commands

```bash
make nuxt    # rm -rf nuxt → scaffold → emit → pnpm install → dev
make next
make vue
make react
pnpm compiler:build
pnpm compiler -- scaffold nuxt
```

Demo apps use **pnpm** everywhere. Settings live in `pnpm.json`; `package.json` is only the app manifest (deps/scripts).

| Emit demo | Output (gitignored) |
|-----------|---------------------|
| Vue | `vue/src/components/` |
| React | `react/src/components/` |
| Nuxt | `nuxt/components/` |
| Next | `next/src/components/` |

Templates: `compiler/templates/{vue,react,nuxt,next}/`.
