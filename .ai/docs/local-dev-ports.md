# Local dev ports

Every product shell uses the same ports (override via env):

| Surface | Port | Env | Shells |
|---------|------|-----|--------|
| Landing (`web*`) | `7777` | `WEB_PORT` | Nuxt `web/`, Next `web-next`, Solid, Svelte, Astro |
| Admin (`admin*`) | `8888` | `ADMIN_PORT` | Nuxt `admin/`, Next `admin-next`, Solid, Svelte, Astro |

Root `.env` / `web/.config/.env.example`:

- `NUXT_PUBLIC_APP_URL=http://localhost:7777`
- `NUXT_PUBLIC_ADMIN_URL=http://localhost:8888`
- `WEB_PORT=7777`
- `ADMIN_PORT=8888`
- `NUC_API_ORIGIN=http://localhost:8888`

Landing shells proxy `/api/*` to **admin** (`NUC_API_ORIGIN`). Run `make admin` (Nuxt) alongside a landing shell for local CMS/public page API.

Converted admin shells (`admin-next`, `admin-solid`, …) do not ship `/api` handlers. When `NUC_API_ORIGIN` would point at the same process (`:8888`), they proxy to `https://admin.nucleify.io` instead. Override with a real API origin (e.g. Nuxt admin on another port) if you need a fully local stack.

```bash
make web                 # :7777 (Nuxt)
make web TARGET=next     # :7777 — needs make admin (Nuxt) for /api
make admin               # :8888 (Nuxt) — owns /api
make admin TARGET=next   # :8888 UI; /api → production admin unless NUC_API_ORIGIN is set elsewhere
curl -s "http://localhost:8888/api/public/pages/home?locale=en"
```
