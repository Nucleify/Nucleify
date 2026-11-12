# your-product after convert

1. Output lives under `--out` (e.g. `my-next/`) — generated host source, yours to own.
2. In that directory: `pnpm install --ignore-workspace` then the host’s `pnpm dev` / build.
3. Edit **your** source app and reconvert when you want a fresh emit — do not treat Nucleify’s `web-astro/` as the customer tree.
4. Optional later: join nucleus (`shared_modules`, Supabase gateway) — that is adoption, not a migrate gate.

```bash
cd my-next
pnpm install --ignore-workspace
pnpm dev
```

Shells overview: [your-product-shells.md](./your-product-shells.md). FAQ: [your-product-faq.md](./your-product-faq.md).
