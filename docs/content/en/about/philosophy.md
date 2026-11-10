# Philosophy

> Build once. Move to any framework - without rewriting the product.

**Migration is the product.** **Yes - bring any existing Next, Nuxt, Vue, React, or other supported app as-is.** Product convert changes the framework host; optional portable IR is only for shared presentational UI. Shared modules are the nucleus when you join this monorepo - not a migrate gate. Seven modern web runtimes.

---

## The problem

Teams lock into a stack early - Vue or React, Nuxt or Next - then pay a rewrite tax when the market, hiring, or a client demands another framework. Auth, i18n, theming, and API shape get copied into every project. Component-only toolchains leave the app, the routes, and the domain behind.

Nucleify treats **migration between technologies** as the durable layer of the monorepo - not a side experiment. Coverage is seven frameworks: **Vue · React · Nuxt · Next · Astro · Svelte · Solid**.

---

## The vision

One migration pipeline. Seven frameworks. Three surfaces. One nucleus (optional after join).

1. **Migrate as a command** - product convert for whole existing apps **as-is** (no `*.nuc.tsx` rewrite, no `shared_modules` refactor first) - [Migrate FAQ](/en/docs/getting-started/migrate-faq)
2. **Three surfaces** - `web/`, `admin/`, and `docs/` in this monorepo
3. **Shared modules** - API, SQL, UI, and domain logic in `shared_modules/` when you join the nucleus - **not** a convert gate
4. **One Supabase backend** - gateway-mediated, module-owned SQL
5. **Optional portable emit** - `*.nuc.tsx` for shared presentational UI; import back from dirty emit

Day-to-day editing stays on Nuxt (`web/`) in this monorepo. Switching frameworks is a convert pass on your existing source - not a rewrite into Nucleify authoring format.

---

## The nucleus metaphor

Like a cell nucleus, Nucleify coordinates the product. Each exported `nuc_*` module is a self-contained unit - frontend utils, optional API handlers, migrations, tests - that can be understood and tested independently.

- **Self-contained modules** - vertical slices, not scattered layers
- **Clear boundaries** - apps compose; modules do not import apps
- **Organic growth** - add or remove modules without rewiring the monorepo
- **Collective strength** - one domain model across web, admin, docs, and every framework host

---

## Core principles

### 1. Any stack → any other

This is the core loop. **Yes - product convert** moves an existing app as-is - including an external Next / Nuxt / Vue / React / … folder or git URL via `--path` / `--git` - to another framework. **No** rewrite into `*.nuc.tsx`, **no** prior `shared_modules` split, **no** token rewrite (see [Compiler](/en/docs/core-concepts/compiler)). Optional portable `*.nuc.tsx` components emit through a custom IR when you want shared presentational UI - that path is not a migrate gate. Emit edits import back to source. The business does not fork per host.

```bash
export PATH="$PWD/.config/bin:$PATH"   # enables --target= / -t=
make web --target=next
make web -t=solid
make web --target=svelte
make web --target=astro
make admin --target=next
make admin -t=solid
make admin --target=svelte
# classic (no shim): make web TARGET=next
```

Published CLI form:

```bash
# This monorepo’s Nuxt web/ → web-next/ (not your external app)
nuc emit convert web --target=next
# Your product as-is:
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
```

Framework choice becomes a **build target**, not an architectural fork.

### 2. Modules over monoliths

Inside this monorepo, domain logic lives in `shared_modules/nuc_*`, not duplicated across apps - a nucleus benefit **after** join, not a convert gate ([Migrate FAQ](/en/docs/getting-started/migrate-faq)). See [Feature-Sliced Design](/en/docs/core-concepts/feature-sliced-design).

### 3. Gateway, not spaghetti

Privileged server access flows through `web/src/server/api/[...slug].ts`. Clients never hold service keys. Modules register handlers; the gateway dispatches.

### 4. Convention over configuration

Split Nuxt config, consistent module layout, Makefile shortcuts (`make help`), Husky-enforced checks - predictable paths reduce decision fatigue.

### 5. Overrides for forks, modules for sharing

White-label diffs use `overrides/`. Cross-product behavior belongs in `shared_modules/`.

### 6. Compiler honesty

Product convert is the migration path for existing apps. Portable authoring is optional and has explicit allowed/forbidden lists (`compiler/PORTABLE.md`). The IR bridges frameworks - we do not pretend Vue and React are identical. Round-trip import and product convert are first-class; a one-way component dump is not the goal.

---

## Canonical Nuxt vs generated hosts

| Day-to-day (Nuxt) | Migrate / emit (convert) |
|---------------------|--------------------------|
| Edit Nuxt + Vue in `web/` | Next, Solid, Svelte, Astro product hosts + portable demos |
| Source of truth | Generated mirrors when a client or team needs another framework |

Converted hosts are not a second hand-maintained codebase. Fix the nucleus, re-run convert. Product messaging always lists **all seven frameworks**, even when daily editing stays on Nuxt.

---

## Design system stance

UI primitives are **framework-agnostic Lit components** (`nui-*` from `nucleify-ui`). Tokens live in `portable/nui/`. Every host wraps the same custom elements - no duplicate button implementations per framework.

---

## Quality bar

The monorepo enforces quality on pre-commit (pre-push is a no-op):

- Bash suite, Biome, TypeScript (web), Stylelint
- Nuxt production build
- Vitest (web + shared) and compiler tests / emit check

---

## What Nucleify is not

- Not a meta-framework that hides hosts - the seven frameworks stay visible
- Not a component-only emit layer - product convert moves whole apps with shared modules
- Not a low-code builder - you write real TypeScript
- Not a hosted SaaS - you own Supabase and deployment
- Not “mystery modules” - six exported `nuc_*` packages power the product today

---

## Related docs

- [Introduction](/en/docs/getting-started/introduction) - technical overview
- [CLI](/en/docs/core-concepts/cli) - `nuc emit` reference
- [Modules](/en/docs/core-concepts/modules) - module architecture
- [Compiler](/en/docs/core-concepts/compiler) - emit and convert
- [Coding Standards](/en/docs/about/coding-standards) - day-to-day conventions
