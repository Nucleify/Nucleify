# CMS slug routing (`/[lang]/[slug]`)

## Behaviour

1. Middleware (`smashed_url`) only collapses **known dead** marketing paths (smashed URLs, `DEAD_ROOTS` under a locale). It does **not** redirect arbitrary CMS slugs to home.
2. `[lang]/[slug]` loads `GET /api/public/pages/:slug?locale=`.
3. Published page → render marketing shell.
4. Missing non-canonical slug → redirect to `/{lang}/home`.
5. Canonical slugs (`home`, `investor`, `thank-you`) keep hardcoded section fallbacks when the API is down.

## Hosts

| Host | Route | Notes |
|------|-------|--------|
| Nuxt `web/` | `pages/[lang]/[slug].vue` | Source of truth + API gateway |
| Next `web-next` | `app/[lang]/[slug]` | Proxies `/api/*` → `NUC_API_ORIGIN` (default `http://localhost:8888` / admin) |
| Solid `web-solid` | `/:lang/:slug` | Same API proxy via Vite |
| Astro `web-astro` | `pages/[lang]/[slug]` | Server output; `CmsShellRoot` island = Next `PublicShellLayout` (rail / shear / CMS sections). Regenerate: `pnpm compiler -- convert web --target=astro --force` then restart `make web TARGET=astro`. |

## Verify

```sh
# published admin page with slug afdhjzfhdsjshfdj
curl -sI "http://localhost:7777/en/afdhjzfhdsjshfdj"   # expect 200 (not 301→home)
curl -sI "http://localhost:7777/en/no-such-page-xyz"  # expect 302→/en/home
curl -sI "http://localhost:7777/en/services"          # expect 301→/en/home (dead root)
```
