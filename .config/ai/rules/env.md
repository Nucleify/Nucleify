# Environment Variables

Example files: `.config/.env.docker.example`, `.config/.env.test.example`, `.config/.env.ci.example`.

## App

| Variable | Example | Description |
|----------|---------|-------------|
| `APP_ENV` | `local` | Environment (local, production, testing) |
| `APP_URL` | `http://localhost` | Laravel app URL |
| `API_URL` | `http://localhost/api` | API base URL (used by `apiUrl()`) |
| `APP_FRONTEND` | `nuxt` | Frontend framework (`nuxt` or `next`) |

## Nuxt (nuxt.config.ts)

| Variable | Example | Description |
|----------|---------|-------------|
| `SSR` | `true` | Enable server-side rendering |
| `PRERENDER_ROUTES` | `/home,/login,...` | Comma-separated routes to prerender |
| `PRERENDER_CRAWL_LINKS` | `true` | Crawl links for prerendering |
| `PRERENDER_IGNORE` | `/settings` | Routes to skip prerendering |
| `PRERENDER_LOCALES` | `en,pl,vn` | Locales for prerendering |

## Submodules

| Variable | Example | Description |
|----------|---------|-------------|
| `NUC_SUBMODULES_BRANCH` | `main` | Git branch for module cloning |
| `NUC_SUBMODULES_CHECK` | `1` | Skip existing dirs when set |

## Docker

| Variable | Example | Description |
|----------|---------|-------------|
| `DOCKER_PLATFORM` | `linux/amd64` | `linux/arm64` for Apple Silicon |

## Database

Default: MySQL via Sail (`DB_HOST=mysql`). Testing uses SQLite. Separate `DB_TEST_DATABASE` for test suite.
