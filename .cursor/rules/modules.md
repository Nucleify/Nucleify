---
description: nuc_* submodule structure, config.json, barrels, and registration
globs: modules/**
alwaysApply: false
---

# Modules

Modular architecture — each feature lives in `modules/nuc_*` as a **git submodule**. Modules are self-contained with optional API (`supabase/`), frontend (`constants/` / `types/` / `utils/` / `components/`), and Vitest tests.

Registered in:
- **Frontend:** `modules/index.ts` (Vue) and `modules/index.react.ts` (React barrel per module)
- **Nuxt plugins:** `nuxt/plugins/modules.ts` — `registerNucExample(nuxtApp.vueApp)`
- **API gateway:** single registry in `modules/nuc_api/supabase/api/gateway_dispatch.ts` (Nuxt `[...slug].ts` and Next adapter both call `dispatchSupabaseApiGateway`)

## Kernel contract (`NucModule`)

```typescript
// modules/nuc_api/types/module.ts
export interface NucModule {
  name: string
  config: NucModuleConfig
  registerVue?: (app: App) => void
  apiHandlers?: readonly NucApiHandler[]
}
```

## Import rules

Module UI must **not** import `from 'nucleify'` (breaks circular barrels). Use relative imports, `nuc_api` / `nuc_client` / `nuc_server`, or `nucleify-ui`. Public surface still exports via `index.ts` / `index.react.ts`.

## UI stack

Feature UI uses **`nucleify-ui`** Lit web components (`nui-*`). There is no `nuxt/atomic` / `next/atomic`.

## `config.json`

```json
{
  "name": "nuc_example",
  "description": "…",
  "version": "0.1.0",
  "category": "core",
  "installed": true,
  "enabled": true
}
```

Folder name is the canonical module key (`modules.name` in DB). Discovered by `nuc_modules` seeder generator.

## Full-Stack Module Structure

```
modules/nuc_example/
├── config.json
├── nuc_example.ts           # Vue plugin — registerNucExample(app)
├── index.ts                 # Vue/Nuxt barrel exports
├── index.react.ts           # React/Next barrel exports (if UI has .tsx)
├── _index.scss              # Optional global module styles
├── supabase/
│   ├── api/                 # handle.ts, *_handlers.ts, *_helpers.ts
│   ├── migrations/
│   ├── factories/
│   └── seeders/
├── constants/               # Shared constants
├── types/                   # Shared types (api/, object/, …)
├── utils/                   # Shared utils (+ utils/api.ts request composables)
├── pages/                   # Full pages (NucExamplePage)
├── components/              # Reusable UI
├── styles/                  # Optional shared SCSS (e.g. nuc_colors)
└── vitests/                 # Vitest unit tests
```

Frontend-only modules skip `supabase/`. API-only modules skip UI folders.

## Vue Plugin Registration

```typescript
// nuc_example.ts
import type { App } from 'vue'
import { NucExamplePage } from '.'

export function registerNucExample(app: App<Element>): void {
  app.component('nuc-example-page', NucExamplePage)
}
```

Then in `nuxt/plugins/modules.ts` (alphabetically after `registerNucGlobals`):

```typescript
registerNucExample(nuxtApp.vueApp)
```

## Barrel Exports

See `frontend.md` — **Module Barrel Exports** section.

- `index.ts` — Vue components as `export { default as NucName } from '…'`, everything else `export *`
- `index.react.ts` — only `export *`; React components use **named exports** (no `export default` in `.tsx`)

## Dual Frontend (Vue + React)

| Surface | Pages | Components |
|---------|-------|------------|
| Nuxt | `nuxt/pages/[lang]/…` thin wrappers | `.vue` in module |
| Next | `next/app/[lang]/…` thin wrappers | `.tsx` in module |

Share logic via `utils/`, `types/`, `constants/`. Split hooks when needed: `use_foo.ts` / `use_foo.react.ts`.

## Submodule Workflow

Modules are separate git repos (see `.gitmodules`). Commit inside `modules/nuc_*` first, then update submodule ref in root.
