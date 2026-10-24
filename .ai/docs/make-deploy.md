# `make deploy web` / `make deploy admin`

Cloudflare Workers deploy for the Nuxt product apps.

```bash
make deploy web    # pnpm build @nucleify/web, then wrangler deploy
make deploy admin  # pnpm build @nucleify/admin, then wrangler deploy
```

`make deploy web` is two Make goals (`deploy` + `web`). The `web` / `admin` recipes become no-ops when `deploy` is also requested, so the usual `make web` / `make admin` dev servers do not start.

Requires `{web,admin}/wrangler.toml`. Admin ships workers.dev-only until custom routes are uncommented in `admin/wrangler.toml`.

## Contact form on Cloudflare

`/api/contact-form` needs Resend baked into Nuxt `runtimeConfig` at **build** time (Worker does not read root `.env` at request time):

| Env | Purpose |
|-----|---------|
| `AUTH_EMAIL_RESEND_KEY` | Resend API key (required; empty → HTTP 503) |
| `AUTH_EMAIL_FROM` | From address (default `business@nucleify.io`) |
| `CONTACT_FORM_EMAIL` | Inbox recipient (default `business@nucleify.io`) |

Set them in repo-root `.env`, then `make deploy web` so the build picks them up.
