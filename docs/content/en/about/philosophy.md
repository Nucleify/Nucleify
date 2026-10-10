# Philosophy

> Build once. Move to any framework — without rewriting the product.

Portability first. Shared modules as the nucleus. Seven modern web shells.

---

## The problem

Teams lock into a stack early — Vue or React, Nuxt or Next — then pay a rewrite tax when the market, hiring, or a client demands another framework. Auth, i18n, theming, and API shape get copied into every project.

Nucleify treats **migration between technologies** as a first-class goal. Coverage is seven shells: **Vue · React · Nuxt · Next · Astro · Svelte · Solid**.

---

## The vision

One nucleus. Three product surfaces. Seven shells.

1. **Shared modules** — API, SQL, UI, and domain logic in `shared_modules/`
2. **Three surfaces** — `web/`, `admin/`, and `docs/` from the same nucleus
3. **Migrate when you need to** — convert or emit to another framework without rewriting the business
4. **One Supabase backend** — gateway-mediated, module-owned SQL

Day-to-day editing stays on Nuxt (`web/`). Switching shells is a command, not a rewrite project.

---

## The nucleus metaphor

Like a cell nucleus, Nucleify coordinates the product. Each exported `nuc_*` module is a self-contained unit — frontend utils, optional API handlers, migrations, tests — that can be understood and tested independently.

- **Self-contained modules** — vertical slices, not scattered layers
- **Clear boundaries** — apps compose; modules do not import apps
- **Organic growth** — add or remove modules without rewiring the monorepo
- **Collective strength** — one domain model across web, admin, docs, and every shell

---

## Core principles

### 1. Any stack → any other

Portable `*.nuc.tsx` components emit to Vue, React, and Solid. Product shells convert with a single command:

```bash
make web TARGET=next
make web TARGET=solid
make admin TARGET=next
make admin TARGET=solid
```

Framework choice becomes a **build target**, not an architectural fork.

### 2. Modules over monoliths

Domain logic lives in `shared_modules/nuc_*`, not duplicated across apps. See [Feature-Sliced Design](/en/docs/core-concepts/feature-sliced-design).

### 3. Gateway, not spaghetti

Privileged server access flows through `web/src/server/api/[...slug].ts`. Clients never hold service keys. Modules register handlers; the gateway dispatches.

### 4. Convention over configuration

Split Nuxt config, consistent module layout, Makefile shortcuts, Husky-enforced checks — predictable paths reduce decision fatigue.

### 5. Overrides for forks, modules for sharing

White-label diffs use `overrides/`. Cross-product behavior belongs in `shared_modules/`.

### 6. Compiler honesty

Portable authoring has explicit allowed/forbidden lists (`compiler/PORTABLE.md`). The IR bridges frameworks — we do not pretend Vue and React are identical.

---

## Dual-mode philosophy

| Day-to-day (Tryb A) | Migrate / emit (Tryb B) |
|---------------------|-------------------------|
| Edit Nuxt + Vue in `web/` | Next (`web-next/`), Solid (`web-solid/`), portable demos |
| Source of truth | Generated mirrors when a client or team needs another shell |

Tryb B is not a second hand-maintained codebase. Fix the nucleus, re-run convert. Product messaging always lists **all seven shells**, even when daily editing stays on Nuxt.

---

## Design system stance

UI primitives are **framework-agnostic Lit components** (`nui-*` from `nucleify-ui`). Tokens live in `portable/nui/`. Every shell wraps the same custom elements — no duplicate button implementations per framework.

---

## Quality bar

The monorepo enforces quality on pre-commit (pre-push is a no-op):

- Bash suite, Biome, TypeScript (web), Stylelint
- Nuxt production build
- Vitest (web + shared) and compiler tests / emit check

---

## What Nucleify is not

- Not a meta-framework that hides hosts — the seven shells stay visible
- Not a low-code builder — you write real TypeScript
- Not a hosted SaaS — you own Supabase and deployment
- Not “mystery modules” — six exported `nuc_*` packages power the product today

---

## Related docs

- [Introduction](/en/docs/getting-started/introduction) — technical overview
- [Modules](/en/docs/core-concepts/modules) — module architecture
- [Compiler](/en/docs/core-concepts/compiler) — emit and convert
- [Coding Standards](/en/docs/about/coding-standards) — day-to-day conventions
