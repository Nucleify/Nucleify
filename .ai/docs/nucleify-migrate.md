# nucleify migrate

Convert **this monorepo’s** products: Nuxt `web/` / `admin/` → gitignored hosts.

| Command | Output |
|---------|--------|
| `make web` | `web/` (canonical) |
| `make web --target=next` | `web-next/` |
| `make web --target=solid` | `web-solid/` |
| `make web --target=svelte` | `web-svelte/` |
| `make web --target=astro` | `web-astro/` |
| `make admin --target=…` | `admin-next/` … `admin-astro/` |

```bash
export PATH="$PWD/.config/bin:$PATH"
pnpm compiler -- convert web --target=astro --force
make web TARGET=astro
```

Shell notes: [nucleify-convert.md](./nucleify-convert.md), [nucleify-astro-shell.md](./nucleify-astro-shell.md), [nucleify-solid-shell.md](./nucleify-solid-shell.md), [nucleify-emit-barrels.md](./nucleify-emit-barrels.md), [nucleify-cms-slug.md](./nucleify-cms-slug.md).

Tracked `@nucleify/docs` ≠ `web-astro/`.

External apps: [your-product-migrate.md](./your-product-migrate.md).
