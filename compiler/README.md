# @nucleify/compiler

IR-first portable UI compiler for Nucleify (option C — custom IR, no Mitosis).

## Authoring & emit

| Role | Files |
|------|--------|
| Authoring | `portable/*.nuc.tsx` |
| Fixtures | `portable/fixtures/{source,ir,emit}` |
| Templates | `compiler/templates/{vue,react,nuxt,next}` |
| Emit demos | `vue/` `react/` `nuxt/` `next/` — **gitignored** |
| Product apps | `web` / `admin` / `docs` — **default shell Nuxt** (docs: Astro); `TARGET=next|…` later (tryb B) |

```text
make web                 # product → Nuxt
make web TARGET=next     # stub until tryb B
make nuxt                 # emit demo scaffold (not product root)
```

## CLI

```bash
pnpm compiler -- scaffold nuxt
pnpm compiler -- build --app=nuxt
pnpm compiler:check
pnpm compiler:build
pnpm compiler:test
pnpm compiler -- import --from=vue path/to/Component.vue
pnpm compiler -- import --from=react path/to/Component.tsx
```

### Cycle A — authoring first

```bash
# edit portable/Foo.nuc.tsx
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
