# Nucleify – Coding Standards

This document defines coding, structure, and naming standards for the Nucleify project.  
Following these standards ensures code is readable, consistent, and maintainable across all packages.

## Table of Contents

- [Monorepo Structure](#monorepo-structure)
- [Package Overview](#package-overview)
- [Shared Module Structure](#shared-module-structure)
- [Web App Structure](#web-app-structure)
- [File and Folder Naming](#file-and-folder-naming)
- [Component Architecture](#component-architecture)
- [Coding Rules](#coding-rules)
- [Testing Standards](#testing-standards)
- [Module Guidelines](#module-guidelines)
- [Why These Standards](#why-these-standards)
- [Example: Creating a New Module](#example-creating-a-new-module)

---

## Monorepo Structure

```
nucleify/
├── web/               ← @nucleify/web — Nuxt landing app
├── admin/              ← @nucleify/admin — Nuxt admin app
├── docs/               ← @nucleify/docs — Astro documentation
├── compiler/           ← @nucleify/compiler — IR/portable UI compiler
├── shared_modules/     ← shared nuc_* packages
├── overrides/          ← per-package override layers
├── .config/            ← monorepo-level bash scripts and CI helpers
├── .cursor/            ← Cursor agents and shared rules
└── supabase/           ← Supabase config and merged SQL
```

---

## Package Overview

| Package | Name | Tech | Dev command |
|---------|------|------|-------------|
| `web/` | `@nucleify/web` | Nuxt 3 | `pnpm nuxt` |
| `admin/` | `@nucleify/admin` | Nuxt 3 | `pnpm admin` |
| `docs/` | `@nucleify/docs` | Astro | `pnpm docs` |
| `compiler/` | `@nucleify/compiler` | TypeScript | — |
| `shared_modules/` | `@nucleify/shared_modules` | TypeScript / Vue | — |

Each package has its own `package.json`, `.config/`, and optional `.config/rules/`.

---

## Shared Module Structure

Shared feature packages live in `shared_modules/nuc_*` and are self-contained:

```
shared_modules/nuc_example/
├── config.json             ← Module metadata
├── nuc_example.ts          ← Vue plugin (registerNucExample)
├── index.ts                ← Vue/Nuxt barrel exports
├── _index.scss             ← Global module styles (optional)
├── supabase/
│   ├── api/
│   │   ├── handle.ts           ← Gateway entry
│   │   ├── example_handlers.ts ← Route table + handlers
│   │   └── example_helpers.ts  ← Domain helpers
│   ├── migrations/
│   ├── factories/
│   └── seeders/
├── constants/
├── types/
├── utils/
│   └── api.ts              ← Request composables
├── pages/                  ← Full page components (NucExamplePage)
├── components/             ← Reusable UI components
├── styles/                 ← Optional shared SCSS
└── vitests/                ← Vitest unit tests
```

Frontend-only modules omit `supabase/`. API-only modules omit UI folders.

---

## Web App Structure

```
web/src/
├── pages/
│   ├── [lang]/         ← Thin i18n route wrappers
│   └── home/           ← Landing sections
├── plugins/
│   ├── nucleify-ui.client.ts
│   └── modules.ts      ← registerNuc* calls
├── composables/        ← Auto-imported Vue composables
├── server/api/         ← Nitro catch-all → nuc_api gateway
├── assets/             ← SCSS entry (_index.scss)
├── layouts/
├── middleware/
└── nucleify.ts         ← Re-exports from shared_modules
```

Config pieces split in `web/.config/nuxt/`. Entry: `web/nuxt.config.ts`.

---

## File and Folder Naming

### TypeScript / Vue

| Type | Convention | Example |
|------|------------|---------|
| Module folders | `snake_case` | `nuc_colors`, `nuc_entities` |
| Vue components | `kebab-case` folder, `index.vue` | `input-text/index.vue` |
| TypeScript files | `snake_case` | `use_auth.ts`, `gateway_dispatch.ts` |
| React-specific files | `*.react.ts` | `use_headings.react.ts` |
| Type definitions | `PascalCase` names | `NucColorObjectInterface` |
| Constants | `SCREAMING_SNAKE_CASE` | `API_BASE_URL` |
| Entry points | `index.ts` / `index.vue` | barrel or component root |

---

## Component Architecture

UI comes from **`nucleify-ui`** Lit web components (`nui-*`). Feature screens in `shared_modules/nuc_*/pages/` are thin wrappers around those custom elements.

### Component file structure

```
<component>/
├── index.vue           ← Main component
├── _index.scss         ← Component styles (optional)
└── types/
    ├── index.ts
    ├── interfaces.ts
    └── variables.ts
```

---

## Coding Rules

### General

- Prefer **readability** over cleverness
- Follow **KISS** and **DRY**
- Comment only when intent is unclear
- Remove unused code — do not comment it out
- Keep functions small and focused

### TypeScript

- Strict mode; no `any`
- Prefer interfaces over type aliases for objects
- Export types from `types/` folders
- Use `const` assertions for literal types
- Naming: `Nuc{Entity}{Type}Interface` (e.g. `NucColorObjectInterface`)

### Vue

- Composition API with `<script setup lang="ts">`
- Define props and emits with TypeScript
- Keep templates clean; move logic to composables or utils
- Use `index.vue` as component entry point

---

## Testing Standards

### Frontend (Vitest)

- Config: `web/.config/vitest.config.ts`; entry: `web/vitest.config.ts`
- Tests in `shared_modules/nuc_*/vitests/` or `web/vitests/`
- Filename: `*.test.ts`
- `vi.clearAllMocks()` in `beforeEach`
- Mock external dependencies; test behavior, not implementation

```bash
pnpm tests        # vitest run
pnpm test:watch   # vitest watch
```

---

## Module Guidelines

- Each module must be **self-contained** — no imports from app packages (`web`, `admin`, `docs`)
- Do not import `from 'nucleify'` inside modules (circular barrel)
- Backend logic: `supabase/api/`, `supabase/migrations/`, `supabase/seeders/`
- Frontend: `constants/`, `types/`, `utils/`, `pages/`, `components/`
- Register in: `shared_modules/index.ts`, `web/src/plugins/modules.ts`, and the API gateway
- Use `config.json` for module metadata

---

## Why These Standards

- Aligns with Nuxt 3, Astro, and Supabase patterns
- Enables horizontal scaling via isolated `nuc_*` modules
- Clear separation: shared logic in `shared_modules/`, app shell in `web/`/`admin/`/`docs/`
- UI via `nucleify-ui` (`nui-*`) — no framework-specific coupling
- Easy onboarding for new contributors

---

## Example: Creating a New Module

```
shared_modules/nuc_example/
├── config.json
├── nuc_example.ts
├── index.ts
├── supabase/
│   ├── api/
│   │   ├── handle.ts
│   │   ├── example_handlers.ts
│   │   └── example_helpers.ts
│   └── migrations/
│       └── 20240101000000_nuc_example.sql
├── constants/
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   └── api.ts
├── pages/
│   └── NucExamplePage/
│       └── index.vue
├── components/
│   └── ExampleCard/
│       └── index.vue
└── vitests/
    └── example.test.ts
```
