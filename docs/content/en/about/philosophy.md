# Philosophy

> *"Write once, run everywhere. Stop reinventing — start building."*

The principles, values, and vision behind Nucleify.

---

## The problem

Modern web development forces premature framework commitment. Pick Vue or React, build features, then rebuild when requirements change. Shared concerns — auth, i18n, theming, API shape — get reimplemented in every project.

Nucleify treats **portability** and **modularity** as first-class goals, not afterthoughts.

---

## The vision

Nucleify is a modular full-stack monorepo with a portable UI compiler at its center:

1. **Develop in Nuxt** (Tryb A) — the canonical product shell
2. **Share logic in modules** — six domain packages in `shared_modules/`
3. **Emit React when needed** (Tryb B) — compiler converts shells and components
4. **One Supabase backend** — gateway-mediated, module-owned SQL

One team, one domain model, multiple deployment targets.

---

## The nucleus metaphor

Like a cell nucleus, Nucleify is the **coordination point** of the application. Each `nuc_*` module is a self-contained unit — frontend utils, API handlers, migrations, tests — that can be understood, tested, and replaced independently.

- **Self-contained modules** — complete vertical slices, not scattered layers
- **Clear boundaries** — apps compose; modules do not import apps
- **Organic growth** — add or remove modules without rewiring the monorepo
- **Collective strength** — shared modules amortize cost across web, admin, and Next outputs

---

## Core principles

### 1. Write once, run everywhere

Portable `*.nuc.tsx` components compile to Vue SFCs and React TSX from one IR. Product shells convert with a single command:

```bash
make web TARGET=next
```

Framework choice becomes a **build target**, not an architectural fork.

### 2. Modules over monoliths

Domain logic lives in `shared_modules/nuc_*`, not duplicated across apps. See [Feature-Sliced Design](/en/docs/core-concepts/feature-sliced-design).

### 3. Gateway, not spaghetti

All privileged server access flows through `web/src/server/api/[...slug].ts`. Clients never hold service keys. Modules register handlers; the gateway dispatches.

### 4. Convention over configuration

Split Nuxt config, consistent module layout, Makefile shortcuts, Husky-enforced checks — predictable paths reduce decision fatigue.

### 5. Overrides for forks, modules for sharing

White-label or deployment-specific diffs use `overrides/`. Cross-product behavior belongs in `shared_modules/`.

### 6. Compiler honesty

Portable authoring has explicit allowed/forbidden lists (`compiler/PORTABLE.md`). No pretending Vue and React are identical — the IR handles the gap.

---

## Dual-mode philosophy

| Tryb A | Tryb B |
|--------|--------|
| Where humans edit daily | What CI or clients may require |
| Nuxt + Vue in `web/` | Next + React in `web-next/` |
| Source of truth | Generated mirror |

Tryb B is not a second codebase to maintain by hand. Drift is resolved by re-running convert, or by fixing Tryb A and rebuilding.

---

## Design system stance

UI primitives are **framework-agnostic Lit components** (`nui-*` from `nucleify-ui`). Tokens live in `portable/nui/`. Vue and React shells wrap the same custom elements — no duplicate button implementations.

---

## Quality bar

The monorepo enforces quality at commit time:

- Biome for lint/format
- TypeScript strict checking on web
- Stylelint on SCSS
- Vitest on web and shared modules
- Compiler check ensuring emit matches authoring

Fast feedback beats manual review for mechanical correctness.

---

## Open source ethos

Nucleify is MIT-licensed. We optimize for:

- **Readable docs** — accurate paths, real examples
- **Contributor-friendly structure** — one module, one PR
- **Respectful collaboration** — see [Code of Conduct](/en/docs/about/code-of-conduct)

---

## What Nucleify is not

- Not a meta-framework that hides Vue/React entirely — both remain visible
- Not a low-code builder — you write real TypeScript
- Not a hosted SaaS — you own Supabase and deployment
- Not finished — the compiler and module set evolve with the product

---

## Related docs

- [Introduction](/en/docs/getting-started/introduction) — technical overview
- [Philosophy in practice](/en/docs/core-concepts/modules) — module architecture
- [Coding Standards](/en/docs/about/coding-standards) — day-to-day conventions
