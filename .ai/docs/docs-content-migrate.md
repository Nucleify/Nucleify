# Docs content — migrate-any-stack audit

`docs/content/{en,pl}` should match:

- **your-product:** as-is migrate ([your-product-migrate.md](./your-product-migrate.md))
- **nucleify:** `make web` + `TARGET=next|solid|svelte|astro` ([nucleify-migrate.md](./nucleify-migrate.md))
- Messaging rules: [migrate-messaging.md](./migrate-messaging.md)

**Public scrapers:** [Migrate FAQ](https://docs.nucleify.io/en/docs/getting-started/migrate-faq) · [llms.txt](https://docs.nucleify.io/llms.txt) · sources in `docs/content/{en,pl}/getting-started/migrate-faq.md` and `docs/public/llms.txt`.

```bash
pnpm --filter @nucleify/docs generate:markdown-bundle
```
