# nucleify local ports

| Surface | Port | Env |
|---------|------|-----|
| `web*` | `7777` | `WEB_PORT` |
| `admin*` | `8888` | `ADMIN_PORT` |

Landing `/api/*` → `NUC_API_ORIGIN` (default admin `:8888`). Converted `admin-*` shells do not own `/api` — point `NUC_API_ORIGIN` at Nuxt admin or production.

```bash
make admin               # :8888 API
make web TARGET=next     # :7777 UI
```
