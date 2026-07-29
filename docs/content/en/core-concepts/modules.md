# Modules

Modules are the core organizational unit in Nucleify. They encapsulate related functionality into reusable packages that work across **Supabase** (backend SQL + API handlers) and **Vue/Nuxt** or **React/Next** (frontend).

## Naming Convention

| Type | Prefix | Example |
|------|--------|---------|
| Core modules | `nuc_` | `nuc_users`, `nuc_entities` |
| Custom modules | `your_prefix_` | `ex_payments`, `my_blog` |

Core modules (`nuc_*`) are maintained by Nucleify. Custom modules should use a unique prefix to avoid conflicts.

## Module Structure

```txt
modules/ex_example/
├── config.json              # Module metadata (required)
├── ex_example.ts            # Vue component registration
├── ex_example.react.ts      # React registration (optional)
├── index.ts                 # TypeScript barrel export
├── _index.scss              # SCSS entry point
├── README.md
├── atomic/                  # UI components & composables
├── supabase/                # Backend: SQL + API handlers
│   ├── migrations/
│   ├── seeders/
│   ├── factories/
│   └── api/handle.ts
└── vitests/                 # Vitest tests
```

## Required Files

### `config.json`

Module metadata and state:

```json
{
  "name": "ex_example",
  "description": "Example module description",
  "version": "0.0.1",
  "category": "feature",
  "installed": true,
  "enabled": true
}
```

| Field | Description |
|-------|-------------|
| `name` | Unique identifier, must match folder name |
| `description` | Brief module purpose |
| `version` | Semantic version |
| `category` | `core`, `feature`, or `utility` |
| `installed` | Whether module is installed |
| `enabled` | Whether module is active |

### `ex_example.ts`

Vue global component registration:

```typescript
import type { App } from 'vue'
import { ExExamplePage } from './atomic'

export function registerExExample(app: App<Element>): void {
  app.component('ex-example-page', ExExamplePage)
}
```

Register in `nuxt/plugins/modules.ts` via `registerExExample`.

### `supabase/api/handle.ts`

API handler for the module gateway:

```typescript
import { apiNotHandled, trySimpleCrud } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleExampleApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'examples') return apiNotHandled()
  return (await trySimpleCrud(ctx, { table: 'examples' })) ?? apiNotHandled()
}
```

Add `handleExampleApi` to `nuxt/server/api/[...slug].ts` handlers array.

### `index.ts`

Barrel export for all module exports:

```typescript
export * from './ex_example'
export * from './atomic'
export * from './vitests'
```

Add to `modules/index.ts`:

```typescript
export * from './ex_example'
```

## Backend Structure (`supabase/`)

```txt
supabase/
├── migrations/                     # PostgreSQL schema (*.sql)
├── seeders/                        # Seed data
├── factories/                      # Demo/test data
├── api/
│   ├── handle.ts                   # Gateway entry: handleExampleApi
│   └── *_helpers.ts                # Table names, row mapping
└── functions/                      # Optional Edge Functions
```

Handlers use `nuc_api` helpers (`trySimpleCrud`, `tryScopedCrud`) and the Supabase JS client passed in `ApiContext`.

## Frontend Structure (`atomic/`)

Uses Atomic Design methodology:

```txt
atomic/
├── index.ts                        # Barrel export
├── _index.scss                     # SCSS imports
├── bosons/                         # Utilities & types (smallest units)
│   ├── constants/                  # Static values
│   │   └── fields/                 # Form field definitions
│   ├── types/                      # TypeScript interfaces
│   │   ├── api/                    # API response types
│   │   └── object/                 # Domain object types
│   └── utils/                      # Helper functions
│       └── api/                    # API request functions
├── pages/                          # Full page components
│   └── General/
│       ├── index.ts
│       └── index.vue
└── templates/                      # Page sections/layouts
    └── Dashboard/
        ├── index.ts
        └── General.vue
```

### Bosons

Smallest building blocks - types, constants, utilities:

```typescript
// types/api/interfaces.ts
export interface ExampleApiResponse {
  id: number
  name: string
  created_at: string
}

// utils/api.ts
export async function getExamples(): Promise<ExampleApiResponse[]> {
  return await api.get('/api/examples')
}
```

### Pages

Full-page Vue components:

```html
<!-- pages/General/index.vue -->
<template>
  <ExExampleDashboard />
</template>

<script setup lang="ts">
import { ExExampleDashboard } from '../../templates'
</script>
```

### Templates

Reusable page sections:

```html
<!-- components/Dashboard/General.vue -->
<template>
  <section class="ex-example-dashboard">
    <slot />
  </section>
</template>
```

## Database (`supabase/migrations/`)

```txt
supabase/migrations/
└── 20260501000000_nuc_example.sql
```

Apply with `bash .config/bash/apply-module-migrations.sh` (merges all module SQL).

## API routes

The gateway maps `/api/{segments}` to module handlers. Example: `GET /api/examples` → `handleExampleApi` → `supabase.from('examples').select()`.

## Testing

### Vitest (`vitests/`)

Frontend unit tests:

```txt
vitests/
├── index.ts                        # Barrel export
├── api/                            # API request tests
│   └── Example/
│       └── 200.test.ts
└── constants/                      # Test constants
    └── api/
        └── example.ts
```

## Creating a Module

1. **Create folder**: `modules/yourprefix_modulename/`

2. **Add `config.json`** with module metadata

3. **Create entry points**:
   - `yourprefix_modulename.ts` (Vue) and/or `.react.ts` (React)
   - `index.ts` (always required)
   - `supabase/api/handle.ts` (if API needed)

4. **Register module**:
   - Add handler to `nuxt/server/api/[...slug].ts` (and Next gateway if used)
   - Add to `modules/index.ts` and `nuxt/plugins/modules.ts`

5. **Add structure** as needed:
   - `atomic/` for UI
   - `supabase/migrations`, `seeders` for database
   - `vitests/` for tests

## Best Practices

- **Naming**: Use unique prefix (`nuc_` is reserved for core modules)
- **Exports**: Export everything through `index.ts` files
- **Types**: Define all TypeScript types in `types/`
- **API**: Keep API logic in `utils/api.ts`
- **Testing**: Prefer Vitest for UI and API composables
- **SCSS**: Use `_index.scss` for module-specific styles
- **Documentation**: Include `README.md` in each module
