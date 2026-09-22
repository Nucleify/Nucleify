# @nucleify/compiler

IR-first portable UI compiler for Nucleify (option C — custom IR, no Mitosis).

## Authoring & emit

| Role | Files |
|------|--------|
| NUI tokens / register | `portable/nui/` |
| Test fixtures | `compiler/tests/fixtures/{source,ir,emit}` |
| Templates | `compiler/templates/{vue,react,nuxt,next,solid}/{demo,…}` |
| Emit demos | `{vue,react,nuxt,next,solid}/demo/` — **gitignored** |
| Product apps | `web/` (Nuxt default); product convert → flat `{product}-{framework}/` e.g. `web-next/` |

```text
make web                 # product → top-level Nuxt web/
make web TARGET=next     # product → web-next/
make admin TARGET=next   # product → admin-next/
make next                # throwaway emit demo → next/demo
make solid               # throwaway emit demo → solid/demo
```

## CLI

```bash
pnpm compiler -- scaffold next          # → next/demo
pnpm compiler -- scaffold solid         # → solid/demo
pnpm compiler -- convert web --target=next    # → web-next/
pnpm compiler -- convert admin --target=next  # → admin-next/
pnpm compiler -- convert web --target=solid   # → web-solid/
pnpm compiler -- convert admin --target=solid # → admin-solid/
pnpm compiler -- build --app=next
pnpm compiler -- build --app=solid
pnpm compiler -- build --target=solid
pnpm compiler:check
pnpm compiler:build
pnpm compiler:test
pnpm compiler -- import --from=vue path/to/Component.vue
pnpm compiler -- import --from=react path/to/Component.tsx
```

### Portable emit vs product convert

| | Portable emit | Product convert |
|---|--------|--------|
| What | `*.nuc.tsx` → IR → Vue / React / Solid (+ CSS) | product shell under `{product}-{framework}/` |
| Example | `build` → `next/demo` / `solid/demo` / … | `convert web --target=next` → `web-next/` (Vue SFC → React TSX, no `.vue` in output) |
| Not | full app convert | vue-loader host / Vue-in-React bridge |

**Parity rule:** when IR, adapters, attrs, or state emit grow for Vue/React, update Solid emit + `compiler/tests/fixtures/emit/solid/` + tests in the same change.

### Cycle A — authoring first

```bash
# optional: add Foo.nuc.tsx under a discover root (e.g. web/ or portable/)
pnpm compiler:build          # → .vue + .tsx (+ .css) with content-hash; Solid → solid/demo when scaffolded
pnpm compiler:check          # dirty → exit 1
```

### Solid demo smoke

```bash
pnpm compiler -- scaffold solid
pnpm compiler -- build --app=solid --force
cd solid/demo && pnpm install --ignore-workspace && pnpm run --ignore-workspace build
# or: make solid
```

### Cycle B — edit emit first

```bash
# edit generated Foo.vue or Foo.tsx (or sibling Foo.css)
pnpm compiler -- import --from=vue path/to/Foo.vue
# or omit --from when exactly one of .vue/.tsx is dirty:
pnpm compiler -- import path/to/Foo.tsx

# both dirty → must pass --from=
pnpm compiler -- build --force   # discard emit edits; regenerate from *.nuc.tsx
```

`SKIP_COMPILER=1 make setup` skips codegen on bootstrap.

## Layout

```text
compiler/
  templates/        # sources for gitignored demos
  runtime/
  src/
portable/
  *.nuc.tsx
  fixtures/
```
