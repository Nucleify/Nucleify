# @nucleify/compiler

IR-first portable UI compiler for Nucleify (option C — custom IR, no Mitosis).

**Product coverage:** Vue · React · Nuxt · Next · Astro · Svelte · Solid — emit and shell demos are not limited to React/Next or Vue/Nuxt.

## Authoring & emit

| Role | Files |
|------|--------|
| NUI tokens / register | `portable/nui/` |
| Test fixtures | `compiler/tests/fixtures/{source,ir,emit}` |
| Templates | `compiler/templates/{vue,react,nuxt,next,solid,svelte}/{demo,…}` |
| Emit demos | `{vue,react,nuxt,next,solid,svelte}/demo/` — **gitignored** |
| Product apps | `web/` (Nuxt default); product convert → flat `{product}-{framework}/` e.g. `web-next/` |

```text
make web                 # product → top-level Nuxt web/
make web TARGET=next     # product → web-next/
make admin TARGET=next   # product → admin-next/
make web TARGET=svelte   # product → web-svelte/
make next                # throwaway emit demo → next/demo
make solid               # throwaway emit demo → solid/demo
make svelte              # throwaway emit demo → svelte/demo
```

## CLI

```bash
pnpm compiler -- scaffold next          # → next/demo
pnpm compiler -- scaffold solid         # → solid/demo
pnpm compiler -- scaffold svelte        # → svelte/demo
pnpm compiler -- convert web --target=next    # → web-next/
pnpm compiler -- convert admin --target=next  # → admin-next/
pnpm compiler -- convert web --target=solid   # → web-solid/
pnpm compiler -- convert admin --target=solid # → admin-solid/
pnpm compiler -- convert web --target=svelte  # → web-svelte/
pnpm compiler -- convert admin --target=svelte # → admin-svelte/
pnpm compiler -- build --app=next
pnpm compiler -- build --app=solid
pnpm compiler -- build --app=svelte
pnpm compiler -- build --target=svelte
pnpm compiler:check
pnpm compiler:build
pnpm compiler:test
pnpm compiler -- import --from=vue path/to/Component.vue
pnpm compiler -- import --from=react path/to/Component.tsx
```

### Portable emit vs product convert

| | Portable emit | Product convert |
|---|--------|--------|
| What | `*.nuc.tsx` → IR → Vue / React / Solid / Svelte (+ CSS) | product shell under `{product}-{framework}/` |
| Example | `build` → `next/demo` / `solid/demo` / `svelte/demo` / … | `convert web --target=next` → `web-next/` (Vue SFC → React TSX, no `.vue` in output) |
| Not | full app convert | vue-loader host / Vue-in-React bridge |

**Parity rule:** when IR, adapters, attrs, or state emit grow for Vue/React, update Solid **and Svelte** emit + goldens + tests in the same change. Svelte portable limits: [`PORTABLE.md`](./PORTABLE.md) § Svelte ([#694](https://github.com/Nucleify/Nucleify/issues/694)).

### Cycle A — authoring first

```bash
# optional: add Foo.nuc.tsx under a discover root (e.g. web/ or portable/)
pnpm compiler:build          # → .vue + .tsx (+ .css) with content-hash; Solid → solid/demo when scaffolded
pnpm compiler:check          # dirty → exit 1
```

### Solid / Svelte demo smoke

```bash
pnpm compiler -- scaffold solid
pnpm compiler -- build --app=solid --force
cd solid/demo && pnpm install --ignore-workspace && pnpm run --ignore-workspace build
# or: make solid

pnpm compiler -- scaffold svelte
pnpm compiler -- build --app=svelte --force
cd svelte/demo && pnpm install --ignore-workspace && pnpm run --ignore-workspace build
# or: make svelte
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
