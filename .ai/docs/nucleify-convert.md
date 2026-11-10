# nucleify convert

Product convert for **Nucleify** `web/` / `admin/` (no `--path`). CI: `web|admin` × `next|solid|svelte|astro`.

| CLI | Output |
|-----|--------|
| `pnpm compiler -- convert web --target=next` | `web-next/` |
| `… --target=solid\|svelte\|astro` | `web-solid/` / `web-svelte/` / `web-astro/` |
| same for `admin` | `admin-*/` |
| `make web TARGET=astro` | convert + install + dev |

Fonts on convert hosts: Instrument Sans + JetBrains Mono via `<link>` (`portable/nui/fonts.ts`) — not CSS `@import` in a bundled sheet.

Smoke-build is the bar. Portable emit (`*.nuc.tsx` → demos) is a separate optional path.

```bash
pnpm compiler:test && pnpm compiler:check
pnpm compiler -- convert web --target=svelte --force
make admin TARGET=svelte
```

your-product (`--path` / `--git`): [your-product-convert.md](./your-product-convert.md).
