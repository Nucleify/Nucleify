# Environment

Nucleify reads environment variables from a single **repo root** `.env` file. `make run` creates it from `web/.config/.env.example`. Nuxt loads vars through `web/.config/nuxt/load-env.ts` before config evaluation.

---

## Setup

```bash
make run
# edits .env at repo root
```

Never commit `.env`. Example templates live in `web/.config/`:

| File | Purpose |
|------|---------|
| `.env.example` | Local development (copied by `make run`) |
| `.env.ci.example` | CI pipeline reference |
| `.env.test.example` | Test environment reference |

---

## Application

| Variable | Example | Description |
|----------|---------|-------------|
| `APP_NAME` | `Nucleify` | Application display name |
| `APP_ENV` | `local` | `local` / `production` / `testing` |
| `APP_DEBUG` | `true` | Debug flag |
| `NUXT_PUBLIC_APP_URL` | `http://localhost:3000` | Public app URL (also exposed as runtime config) |

---

## Supabase

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes (for API routes) | Project URL |
| `SUPABASE_KEY` | Client | Anon/public key — safe for browser via runtime config |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Service role — **never** expose to client |
| `SUPABASE_EDGE_BASE` | Optional | Edge functions base URL (defaults from `SUPABASE_URL`) |

The Nitro gateway in `web/src/server/api/[...slug].ts` reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Nitro runtime config (sourced from these env vars). Missing values return HTTP 503 for module routes; smoke endpoints `/api` and `/api/test` still respond.

Runtime mapping (`web/.config/nuxt/runtime.ts`):

```typescript
export const runtimeConfig = {
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  public: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_KEY || '',
    supabaseEdgeBase: process.env.SUPABASE_EDGE_BASE || `${process.env.SUPABASE_URL || ''}/functions/v1`,
    appUrl: process.env.NUXT_PUBLIC_APP_URL || 'https://nucleify.io',
    apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api',
    appEnv: process.env.APP_ENV || 'production',
  },
}
```

---

## Nuxt / Nitro

| Variable | Example | Description |
|----------|---------|-------------|
| `SSR` | `true` | Server-side rendering |
| `NITRO_PRESET` | `cloudflare` | Deployment preset for Nitro |
| `PRERENDER_ROUTES` | `/home,/docs,…` | Comma-separated static routes |
| `PRERENDER_CRAWL_LINKS` | `true` | Follow links during prerender |
| `PRERENDER_IGNORE` | `/settings` | Routes to skip |
| `PRERENDER_LOCALES` | `en,pl,vn` | Locales included in prerender |
| `DEV_TOOLS` | | Nuxt DevTools toggle |

---

## Nucleify-specific

| Variable | Example | Description |
|----------|---------|-------------|
| `NUC_SUBMODULES_BRANCH` | `main` | Branch for `prepare:submodules` script |
| `NUC_SUBMODULES_CHECK` | `1` | Skip existing dirs when preparing submodules |
| `NUC_ALLOWED_ORIGINS` | | CORS allowlist |
| `NUC_ALLOWED_ORIGINS_PATTERNS` | | CORS pattern allowlist |
| `NUC_CONVERT_DOCUMENTS_URL` | | External document conversion service |

---

## Integrations (optional)

The example `.env` includes placeholders for Calendly and Google Calendar OAuth. Fill these only if you enable those integrations in your deployment.

| Group | Variables |
|-------|-----------|
| Calendly | `CALENDLY_CLIENT_ID`, `CALENDLY_CLIENT_SECRET`, `CALENDLY_WEBHOOK_SIGNING_KEY`, … |
| Google Calendar | `GOOGLE_CALENDAR_CLIENT_ID`, `GOOGLE_CALENDAR_CLIENT_SECRET`, … |

---

## Next.js / Tryb B

Generated Next shells read Supabase vars with both naming conventions where supported:

- `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)

Keep one root `.env` — both Nuxt and Next codegen paths resolve from the monorepo root.

---

## Local Supabase workflow

With Supabase CLI linked to your project:

```bash
pnpm supabase:migrations:apply:local
pnpm supabase:seeders:apply:local
# or:
pnpm supabase:setup:local
```

See [Supabase](/en/docs/configuration/supabase) for migration merge details.

---

## Security checklist

1. **Never** commit `SUPABASE_SERVICE_ROLE_KEY`
2. Expose only `SUPABASE_KEY` (anon) to the client via `runtimeConfig.public`
3. Privileged DB operations go through `/api/*` gateway handlers
4. Review `NUC_ALLOWED_ORIGINS*` before production deploy

---

## Related docs

- [Installation](/en/docs/getting-started/installation) — first-time `.env` creation
- [Web & Admin](/en/docs/configuration/web) — runtime config and Nuxt split config
- [Supabase](/en/docs/configuration/supabase) — database and migrations
