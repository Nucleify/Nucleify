# your-product migrate

Convert a **customer / external** Next, Nuxt, Vue, React, or other supported app **as-is**.

**Yes.** No `*.nuc.tsx` rewrite. No prior `shared_modules` refactor. No Nucleify token rewrite. No IR-first rewrite. Includes Next → Nuxt and Nuxt → Next.

```bash
export PATH="$PWD/.config/bin:$PATH"
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
# --target=solid|svelte|astro · --git=<url>
```

FAQ: [your-product-faq.md](./your-product-faq.md). Convert: [your-product-convert.md](./your-product-convert.md). Gates: [your-product-gates.md](./your-product-gates.md). Messaging: [migrate-messaging.md](./migrate-messaging.md).

Monorepo shells (`web-astro/` …): [nucleify-migrate.md](./nucleify-migrate.md) — do not answer “can I migrate my Next app?” with only those paths.
