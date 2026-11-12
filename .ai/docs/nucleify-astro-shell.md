# nucleify Astro shell (`web-astro` / `admin-astro`)

Convert Nuxt `web/` / `admin/` → Astro hosts. Not your-product — see [your-product-migrate.md](./your-product-migrate.md).

| Vue class | `.astro` | `*.island.tsx` |
|-----------|----------|----------------|
| static | full template via IR | — |
| island | `<Island client:load …>` | React UI |
| orchestrator | child `.astro` sections | `boot.island.tsx` (motion/rail) |

```bash
make web TARGET=astro
pnpm compiler -- convert web --target=astro --force
```

Templates: `compiler/templates/{astro/demo,web-astro,admin-astro}/`. Tracked `docs/` ≠ `web-astro/`.
