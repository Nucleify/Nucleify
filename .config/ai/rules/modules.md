# Modules

Modular architecture — each feature lives in `modules/nuc_*` as a **git submodule**. Modules are self-contained with optional API (`supabase/`), frontend (`atomic/`), and Vitest tests.

Registered in:
- **Frontend:** `modules/index.ts` (Vue) and `modules/index.react.ts` (React barrel per module)
- **Nuxt plugins:** `nuxt/plugins/modules.ts` — `registerNucExample(nuxtApp.vueApp)`
- **API gateway:** handler imported in `nuxt/server/api/[...slug].ts` and `modules/nuc_api/supabase/api/gateway_dispatch.ts`

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
├── atomic/                  # Frontend (preferred)
│   ├── bosons/              # constants, types, utils/api
│   ├── pages/
│   └── templates/
├── components/              # Alternative to atomic/ (legacy modules)
└── vitests/                 # Vitest unit tests
```

Frontend-only modules skip `supabase/`. API-only modules skip `atomic/`.

## Vue Plugin Registration

```typescript
// nuc_example.ts
import type { App } from 'vue'
import { NucExamplePage } from './atomic'

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

Share logic via `atomic/bosons/` (utils, types, constants). Split hooks when needed: `use_foo.ts` / `use_foo.react.ts`.

## Submodule Workflow

Modules are separate git repos (see `.gitmodules`). Commit inside `modules/nuc_*` first, then update submodule ref in root.
