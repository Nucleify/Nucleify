# Environment Variables

Nucleify reads configuration from `.env` at the repo root. Use `.config/.env.nuxt.example` or `.config/.env.next.example` as a template (`make nuxt` / `make next` copies it automatically).

Config for Nuxt lives in `.config/nuxt/` and is merged in `.config/nuxt.config.ts`.

## Required (Supabase)

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Anon/public key (browser-safe) | `eyJhbG…` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (server only) | `eyJhbG…` |

Never expose `SUPABASE_SERVICE_ROLE_KEY` in client bundles or public repos.

## Application

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_NAME` | App name | `Nucleify` |
| `APP_ENV` | Environment | `local` |
| `APP_DEBUG` | Verbose errors | `true` |
| `APP_FRONTEND` | Active stack | `nuxt` or `next` |
| `NUXT_PUBLIC_APP_URL` | Public URL (Nuxt) | `http://localhost:3000` |

## SSR & Prerendering (Nuxt)

```env
SSR=true
PRERENDER_ROUTES=/home,/dev,/login,/docs
PRERENDER_CRAWL_LINKS=true
PRERENDER_IGNORE=/settings
PRERENDER_LOCALES=en,pl,vn
NITRO_PRESET=cloudflare
```

| Variable | Description |
|----------|-------------|
| `SSR` | Enable server-side rendering |
| `PRERENDER_ROUTES` | Comma-separated routes to prerender |
| `PRERENDER_CRAWL_LINKS` | Discover links during prerender |
| `PRERENDER_IGNORE` | Routes to skip |
| `NITRO_PRESET` | Nitro deploy target |

## Optional

| Variable | Description |
|----------|-------------|
| `SUPABASE_EDGE_BASE` | Edge Functions base URL |
| `NUC_CONVERT_DOCUMENTS_URL` | External document conversion service |
| `DEV_TOOLS` | Enable Nuxt devtools |

## Example `.env` (Nuxt)

```env
APP_NAME=Nucleify
APP_ENV=local
APP_DEBUG=true
NUXT_PUBLIC_APP_URL=http://localhost:3000

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

APP_FRONTEND=nuxt
SSR=true
NITRO_PRESET=cloudflare
```

See [Supabase configuration](/en/docs/configuration/supabase) for how these keys are used in the API gateway and client.
