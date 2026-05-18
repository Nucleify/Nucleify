# Environment Variables

Nucleify uses environment variables for configuration. Copy `.config/.env.docker.example` to `.env` and configure.

Config files (phpunit, pint, stylelint, nuxt, docker-compose, etc.) live in `.config/`. Root files extend or include them.

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_URL` | Application URL | `http://localhost:8000` |
| `APP_ENV` | Environment | `local`, `production` |
| `APP_KEY` | Laravel encryption key | `base64:...` |
| `DB_CONNECTION` | Database driver | `mysql`, `pgsql`, `sqlite` |
| `DB_DATABASE` | Database name | `nucleify` |

## Frontend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_URL` | API endpoint URL | `${APP_URL}/api` |
| `SSR` | Enable server-side rendering | `true` |

## SSR & Prerendering

```env
SSR=true
PRERENDER_ROUTES=/,/home,/docs
PRERENDER_CRAWL_LINKS=true
PRERENDER_IGNORE=/admin,/login
```

| Variable | Description |
|----------|-------------|
| `SSR` | Enable/disable SSR |
| `PRERENDER_ROUTES` | Comma-separated routes to prerender |
| `PRERENDER_CRAWL_LINKS` | Auto-discover links during prerender |
| `PRERENDER_IGNORE` | Routes to skip during prerender |

## Database

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nucleify
DB_USERNAME=root
DB_PASSWORD=secret
```

## Mail

```env
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## Cache & Session

```env
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

For production, consider using `redis` for cache, session, and queue.

## Netlify Deployment

When deploying the Nuxt frontend to Netlify with pnpm:

- **`.npmrc`** – The project includes `public-hoist-pattern[]=*` so Vue and other modules resolve correctly during the Netlify build.
- **`netlify.toml`** – Uses `PNPM_FLAGS = "--shamefully-hoist"` for compatibility with Nuxt on Netlify's build environment.

These settings address the "Could not resolve entry module vue" error that can occur with pnpm's default module layout.

## Example `.env`

```env
APP_NAME=Nucleify
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

API_URL=http://localhost:8000/api
SSR=true

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nucleify
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

