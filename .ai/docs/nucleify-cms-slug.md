# nucleify CMS slug routing

`/[lang]/[slug]` loads published CMS pages. Dead roots smash to home; unknown slugs → `/{lang}/home`.

| Host | Route |
|------|-------|
| Nuxt `web/` | `pages/[lang]/[slug].vue` |
| `web-next` | `app/[lang]/[slug]` |
| `web-solid` | `/:lang/:slug` |
| `web-astro` | `pages/[lang]/[slug]` |

Landing shells proxy `/api/*` to admin (`NUC_API_ORIGIN`). See [nucleify-dev-ports.md](./nucleify-dev-ports.md).
