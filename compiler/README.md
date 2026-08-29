# @nucleify/compiler

IR-first portable UI compiler for Nucleify (option C — custom IR, no Mitosis).

## Authoring & emit

| Role | Files |
|------|--------|
| NUI tokens / register | `portable/nui/` |
| Test fixtures | `compiler/tests/fixtures/{source,ir,emit}` |
| Templates | `compiler/templates/{vue,react,nuxt,next}/{demo,web}` |
| Emit demos | `{vue,react,nuxt,next}/demo/` — **gitignored** |
| Product apps | `web/` (Nuxt default); tryb B → `{framework}/{product}` e.g. `next/web/` |

```text
make web                 # product → top-level Nuxt web/
make web TARGET=next     # product → next/web (tryb B)
make next                # throwaway emit demo → next/demo
```

## CLI

```bash
pnpm compiler -- scaffold next          # → next/demo
pnpm compiler -- convert web --target=next   # → next/web
pnpm compiler -- build --app=next
pnpm compiler:check
pnpm compiler:build
pnpm compiler:test
pnpm compiler -- import --from=vue path/to/Component.vue
pnpm compiler -- import --from=react path/to/Component.tsx
```

### Tryb A vs B

| | Tryb A | Tryb B |
|---|--------|--------|
| What | `*.nuc.tsx` → IR → emit | product shell under `{framework}/{product}` |
| Example | `build` → `next/demo/src/components` | `convert web --target=next` → `next/web` |
| Not | full app convert | single-component emit |
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
