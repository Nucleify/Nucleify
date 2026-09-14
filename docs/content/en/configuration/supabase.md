# Supabase

Nucleify uses [Supabase](https://supabase.com) for PostgreSQL, Auth, Storage, and Edge Functions. Database schema and seed data are **owned by feature modules** in `shared_modules/nuc_*/supabase/` and merged at the monorepo level under `supabase/`.

Server access from Nuxt goes through the Nitro API gateway — not direct service-role calls from the browser.

---

## Architecture

```txt
Browser
  → /api/*  (web/src/server/api/[...slug].ts)
  → dispatchSupabaseApiGateway()
  → nuc_*/supabase/api/handle.ts
  → Supabase (PostgreSQL, Auth, Edge Functions)
```

Gateway registry:

```typescript
// shared_modules/nuc_api/supabase/api/gateway_dispatch.ts
export const supabaseApiGatewayHandlers = [
  handleColorsApi,
  handleLanguagesApi,
] as const
```

Add new domains by implementing `handle*Api` and appending to this array.

---

## Environment

Set in repo root `.env` (see [Environment](/en/docs/configuration/environment)):

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_EDGE_BASE=
```

- **`SUPABASE_KEY`** — exposed to client via `runtimeConfig.public`
- **`SUPABASE_SERVICE_ROLE_KEY`** — server only, used by Nitro gateway

---

## Module SQL layout

Each module can ship SQL artifacts:

```txt
shared_modules/nuc_example/supabase/
├── api/
│   ├── handle.ts
│   └── example_handlers.ts
├── migrations/       # schema changes (*.sql)
├── factories/        # factory SQL for dev/test
└── seeders/          # seed data (*.sql)
```

Examples in the monorepo:

- `nuc_colors/supabase/migrations/`, `seeders/`, `factories/`
- `nuc_languages/supabase/migrations/`

---

## Merge & apply scripts

Module SQL is merged into the monorepo Supabase project by bash scripts in `.config/bash/`:

| Script | Command |
|--------|---------|
| Merge all module SQL | `pnpm supabase:merge-sql` |
| Apply migrations (local) | `pnpm supabase:migrations:apply:local` |
| Apply migrations (linked remote) | `pnpm supabase:migrations:apply:linked` |
| Apply factories (local) | `pnpm supabase:factories:apply:local` |
| Apply seeders (local) | `pnpm supabase:seeders:apply:local` |
| Full local setup | `pnpm supabase:setup:local` |
| Full linked setup | `pnpm supabase:setup:linked` |

Implementation:

- `.config/bash/merge-module-supabase-sql.sh` — collects module SQL
- `.config/bash/apply-module-migrations.sh` — runs migrations
- `.config/bash/apply-module-sql.sh` — runs factories/seeders

---

## Writing API handlers

### Gateway entry (`handle.ts`)

```typescript
import { apiNotHandled, apiMethodNotAllowed } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

export async function handleExampleApi(ctx: ApiContext): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'example') return apiNotHandled()
  // dispatch to route table …
  return apiMethodNotAllowed()
}
```

Return `apiNotHandled()` when the path prefix does not match — the gateway tries the next handler.

### Auth-aware routes

Use helpers from `nuc_api`:

```typescript
import { withGatewayUser } from 'nuc_api'

return withGatewayUser(ctx, async (gatewayCtx, userId) => {
  // userId available for RLS-scoped queries
})
```

### Client requests

Use `nuc_api` request utilities from the frontend:

```typescript
import { apiRequest } from 'modules/nuc_api/utils/api_request'
```

Never embed the service role key in client code.

---

## Row Level Security

Enable RLS on tables exposed to PostgREST. Add policies for the `authenticated` role. Module migrations should include policies alongside table definitions.

Test policies against both anon and authenticated clients before shipping.

---

## Edge Functions

Module edge functions live under `shared_modules/nuc_*/supabase/functions/`. Example:

```txt
shared_modules/nuc_colors/supabase/functions/user-colors/index.ts
```

`SUPABASE_EDGE_BASE` in `.env` points to `{SUPABASE_URL}/functions/v1` by default.

---

## Local development workflow

1. Install Supabase CLI and start local stack (or link a remote project)
2. Configure root `.env` with project URL and keys
3. Apply merged SQL:

```bash
pnpm supabase:setup:local
```

4. Start Nuxt:

```bash
make web
```

5. Verify gateway:

```bash
curl http://localhost:3000/api
curl http://localhost:3000/api/colors/…   # module-specific routes
```

---

## Monorepo `supabase/` directory

Top-level `supabase/` holds project config, merged migration output, and shared edge function config — populated by merge scripts from module sources.

---

## Related docs

- [Modules](/en/docs/core-concepts/modules) — module structure and gateway registration
- [Environment](/en/docs/configuration/environment) — Supabase env vars
- [Web & Admin](/en/docs/configuration/web) — Nitro gateway entry point
