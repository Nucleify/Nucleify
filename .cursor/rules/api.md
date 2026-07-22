---
description: Supabase module API, gateway handlers, migrations, and client requests
globs: modules/*/supabase/**,nuxt/server/**,modules/nuc_api/**
alwaysApply: false
---

# API & Database (Supabase)

Backend logic lives in **TypeScript** inside `modules/nuc_*/supabase/`. There is no Laravel layer — PostgreSQL is managed via Supabase migrations, and HTTP is handled by a module API gateway.

## Gateway

- **Nuxt:** `nuxt/server/api/[...slug].ts` — Nitro catch-all, dispatches to module handlers
- **Next:** `modules/nuc_api/supabase/api/gateway_dispatch.ts` — same handler list
- New module APIs must be registered in **both** gateway files (or only the one you target)

Handlers receive `ApiContext` (`nuc_server`) with `supabase`, `segments`, `method`, `event`.

## Module API Structure

```
modules/nuc_example/supabase/
├── api/
│   ├── handle.ts           # Entry: segment match + auth wrapper
│   ├── example_handlers.ts # Route table + handler functions
│   └── example_helpers.ts  # Formatters, parsers, domain helpers
├── migrations/
│   └── YYYYMMDDHHMMSS_nuc_example.sql
├── factories/
│   └── YYYYMMDDHHMMSS_nuc_example_factory.sql
└── seeders/
    └── YYYYMMDDHHMMSS_nuc_example_seeder.sql   # or module_seeder.sql
```

### `handle.ts` pattern

```typescript
import { apiMethodNotAllowed, apiNotHandled, dispatchAuthRoutes, withGatewayUser } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import { exampleRoutes } from './example_handlers'

export async function handleExampleApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'example') return apiNotHandled()

  return withGatewayUser(ctx, async (gatewayCtx, userId) => {
    const result = await dispatchAuthRoutes(exampleRoutes, gatewayCtx, userId)
    return result ?? apiMethodNotAllowed()
  })
}
```

### Handlers

- Use helpers from `nuc_api`: `apiOk`, `apiError`, `apiMsg`, `fromSupabaseError`, `whenAuth`, `tryScopedCrud`
- Parse body with `readBody` (h3); query with `getQuery`
- Return typed `ApiHandlerResult` — never throw uncaught errors to the client
- Scope data by `user_id` for user-owned resources

### CRUD-heavy modules

`nuc_entities` uses `tryScopedCrud` with table maps and formatters — good reference for standard entity tables.

### Custom modules

`nuc_calendar` is a good reference for custom routes, validation helpers, and multi-table logic.

## SQL Workflow

```bash
pnpm supabase:merge-sql              # merge module SQL into supabase/.temp/
pnpm supabase:migrations:apply:local # or :linked
pnpm supabase:setup:linked           # migrations + factories + seeders
```

- Migrations: `modules/nuc_*/supabase/migrations/*.sql`
- Seeders merged by `.config/bash/merge-module-supabase-sql.sh`
- `nuc_modules` seeder is **auto-generated** from `modules/*/config.json` via `generate-seeder.mjs`
- Enable RLS on new tables; add policies for `authenticated` role

## Client API (frontend)

- Request composables in `utils/api.ts` (e.g. `calendarRequests()`)
- Wrap calls with `apiHandle` / `apiUrl` from `nuc_api`
- Types: `types/api/interfaces.ts` (+ `interfaces.react.ts` when needed)

## Auth

- Supabase Auth (JWT / session via `@supabase/supabase-js`)
- Gateway resolves user via `withGatewayUser`; handlers receive `userId: string` (UUID)
- Env: `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only)
