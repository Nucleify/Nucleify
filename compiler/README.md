# @nucleify/compiler

IR-first portable UI compiler for Nucleify (option C — custom IR, no Mitosis).

## Authoring & emit

| Role | Files |
|------|--------|
| NUI tokens / register | `portable/nui/` |
| Test fixtures | `compiler/tests/fixtures/{source,ir,emit}` |
| Templates | `compiler/templates/{vue,react,nuxt,next}/{demo,web}` |
| Emit demos | `{vue,react,nuxt,next}/demo/` — **gitignored** |
| Product apps | `web/` (Nuxt default); tryb B → flat `{product}-{framework}/` e.g. `web-next/` |

```text
make web                 # product → top-level Nuxt web/
make web TARGET=next     # product → web-next/ (tryb B)
make admin TARGET=next   # product → admin-next/ (tryb B)
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

### Tryb A vs B

| | Tryb A | Tryb B |
|---|--------|--------|
| What | `*.nuc.tsx` → IR → emit | product shell under `{product}-{framework}/` |
| Example | `build` → `next/demo` / `solid/demo` / … | `convert web --target=next` → `web-next/` (Vue SFC → React TSX, no `.vue` in output) |
| Not | full app convert | vue-loader host / Vue-in-React bridge |
### Cycle A — authoring first

```bash
# optional: add Foo.nuc.tsx under a discover root (e.g. web/ or portable/)
pnpm compiler:build          # → .vue + .tsx (+ .css) with content-hash
pnpm compiler:check          # dirty → exit 1
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
