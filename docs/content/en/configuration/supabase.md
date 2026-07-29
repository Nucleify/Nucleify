# Supabase Configuration

Nucleify uses **Supabase** as the backend: **PostgreSQL** for data, **Auth** for users, **Storage** for files, and optional **Edge Functions**. The frontend talks to a **module API gateway** on Nuxt/Next server routes that uses the Supabase **service role** client.

---

## How It Works

```txt
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        NUXT 3 / NEXT (frontend + server routes)                        │
│                                                                                        │
│ ┌────────────────────────┐    ┌────────────────────────┐    ┌────────────────────────┐ │
│ │     Vue / React UI     │───►│    nuc_api (client)    │───►│     /api/* gateway     │ │
│ │     Pinia / Zustand    │───►│    apiRequest, auth    │───►│    (Nitro / Route)     │ │
│ └────────────────────────┘    └────────────────────────┘    └────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                            │
                            modules/*/supabase/api/handle.ts
                              (per-module route handlers)
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                        SUPABASE                                        │
│                                                                                        │
│     ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│     │   PostgreSQL   │  │      Auth      │  │    Storage     │  │ Edge Functions │     │
│     │     + RLS      │  │  (JWT users)   │  │   (buckets)    │  │   (optional)   │     │
│     └────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Request flow

1. **Browser** calls `apiRequest('/api/contacts', …)` from `nuc_api` (or module composables built on it).
2. **Server route** `nuxt/server/api/[...slug].ts` (or Next equivalent) receives the request.
3. A **Supabase client** is created with `SUPABASE_SERVICE_ROLE_KEY` (server only).
4. The gateway loops **module handlers** (`handleEntitiesApi`, `handleUsersApi`, …). The first handler that recognizes the path returns JSON.
5. Handlers use helpers from `nuc_api` (`tryScopedCrud`, `trySimpleCrud`, custom routes) to run **SQL via Supabase JS client** (`supabase.from('table').select()` etc.).
6. For **auth**, the browser uses the **anon key** (`SUPABASE_KEY`) via `getSupabaseClient()` / `nuc_client` — e.g. `supabase.auth.signInWithPassword`, then profile rows in `user_profiles`.

### Why a gateway instead of only RLS from the browser?

- One **consistent REST shape** for all modules (`/api/{resource}`, `/api/{resource}/{id}`).
- **Service role** on the server can perform admin operations safely (never expose service role to the client).
- Module handlers can add **validation, scoping** (`user_id`), and **response formatting** before data hits the UI.
- Same handlers work on **Nuxt (Nitro)** and **Next (App Router)**.

---

## Environment Variables

Copy `.config/.env.nuxt.example` or `.config/.env.next.example` to `.env` at the repo root.

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes | Project URL (`https://<ref>.supabase.co`) |
| `SUPABASE_KEY` | Yes | Anon/public key — safe in browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (server) | Service role — **server only**, used by `/api/*` gateway |
| `SUPABASE_EDGE_BASE` | Optional | Base URL for Edge Functions |
| `NUXT_PUBLIC_APP_URL` | Nuxt | Public app URL (e.g. `http://localhost:3000`) |

Nuxt exposes public values via `runtimeConfig.public` in `.config/nuxt/runtime.ts`:

```typescript
public: {
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_KEY || '',
}
```

Private server config:

```typescript
supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
```

Next reads `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_KEY` with fallback to `SUPABASE_*` in `next.config.ts`.

---

## Module layout (`supabase/`)

Each module that needs backend logic keeps SQL and handlers next to frontend code:

```txt
modules/nuc_example/
├── config.json
├── nuc_example.ts              # registerNucExample (Vue)
├── index.ts                    # barrel
├── atomic/                     # UI + api composables
└── supabase/
    ├── migrations/             # PostgreSQL DDL (*.sql)
    ├── seeders/                # Seed data (*.sql)
    ├── factories/              # Test/demo data (*.sql)
    ├── api/
    │   ├── handle.ts           # export handleExampleApi(ctx)
    │   └── *_helpers.ts        # table names, row mapping
    └── functions/              # Optional Deno Edge Functions
```

### Registering API handlers

**Nuxt** — add handler to `nuxt/server/api/[...slug].ts`:

```typescript
import { handleExampleApi } from '../../../modules/nuc_example/supabase/api/handle'

const handlers = [
  // …existing handlers
  handleExampleApi,
]
```

**Next** — register in `modules/nuc_api/supabase/api/gateway_dispatch.ts` (`supabaseApiGatewayHandlers`).

Each handler receives `ApiContext`:

```typescript
type ApiContext = {
  event: H3Event          // or Next request wrapper
  method: string          // GET, POST, PUT, DELETE
  segments: string[]      // path after /api/
  supabase: SupabaseClient
  ok: (data, extra?) => object
}
```

Return `apiNotHandled()` if the path is not yours; return `apiOk(ctx, data)` or `apiError(status, message)` when handled.

### CRUD helpers (`nuc_api`)

| Helper | Use case |
|--------|----------|
| `trySimpleCrud` | Public tables, nested paths like `/api/modules` |
| `tryScopedCrud` | Rows scoped by `user_id` (contacts, files, …) |
| Custom routes | `dispatchRoutes` / module-specific handlers (auth, uploads) |

---

## Database: migrations & seeders

SQL files live per module under `supabase/migrations/` and `supabase/seeders/`. The repo merges them into a single file and applies via Supabase CLI:

```bash
# Merge all module migrations (sorted by filename)
bash .config/bash/merge-module-supabase-sql.sh migrations

# Apply to local Supabase (requires supabase CLI + running instance)
bash .config/bash/apply-module-migrations.sh

# Seeders
bash .config/bash/merge-module-supabase-sql.sh seeders
bash .config/bash/apply-module-sql.sh seeders
```

Merged output: `supabase/.temp/merged_migrations.sql`, `merged_seeders.sql`.

**Naming:** `YYYYMMDDHHMMSS_nuc_modulename_description.sql` — same order across all modules.

**RLS:** Migrations typically `enable row level security` and add policies. The API gateway uses the service role; direct client access still respects policies when using the anon key.

---

## Authentication

- **Sign up / login:** `nuc_users` (`auth/`) uses `getSupabaseClient().auth` (email/password, session JWT).
- **Profile:** After auth, `user_profiles` row is loaded (`getAndSetUser` in `nuc_users/auth`).
- **API calls:** `apiRequest` sends cookies/headers as configured; server validates scope via Supabase auth uid in handlers.
- Sessions are **Supabase Auth JWTs**.

---

## Client (`nuc_client`)

```typescript
import { getSupabaseClient } from 'nuc_client'

const supabase = getSupabaseClient()
const { data } = await supabase.from('contacts').select('*')
```

`modules/nuc_api/supabase/client.ts` resolves URL/key from Nuxt `runtimeConfig` or Next `process.env`.

---

## Local development checklist

1. Create a project at [supabase.com](https://supabase.com) (or run `supabase start` locally).
2. Set `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` in `.env`.
3. Run migrations: `bash .config/bash/apply-module-migrations.sh`
4. Run seeders: `bash .config/bash/apply-module-sql.sh seeders`
5. Start frontend: `make nuxt` or `make next`
6. Verify gateway: `GET /api/test` → `{ "message": "Hello World" }`

---

## Production notes

- Never commit **service role** keys; use CI/host secrets.
- Set `NITRO_PRESET` (e.g. `cloudflare`) for Nuxt deploy; gateway runs as serverless functions.
- Ensure CORS and `NUXT_PUBLIC_APP_URL` match your deployed domain.
- Run merged migrations against production DB before deploy.
