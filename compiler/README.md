# @nucleify/compiler

IR-first portable UI compiler for Nucleify (option C — custom IR, no Mitosis).

## Authoring & emit

| Role | Files |
|------|--------|
| Authoring | `portable/*.nuc.tsx` |
| Fixtures | `portable/fixtures/{source,ir,emit}` |
| Templates | `compiler/templates/{vue,react,nuxt,next}` |
| Emit demos | `vue/` `react/` `nuxt/` `next/` — **gitignored** |
| Product apps | `root` / `admin` / `docs` — **default shell Nuxt** (docs: Astro); `TARGET=next|…` later (tryb B) |

```text
make web                 # product → Nuxt
make web TARGET=next     # stub until tryb B
make nuxt                 # emit demo scaffold (not product root)
```

## CLI

```bash
pnpm compiler -- scaffold nuxt
pnpm compiler -- build --app=nuxt
pnpm compiler:build
pnpm compiler:test
```

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
