# your-product FAQ

Canonical answers for agents and scraped docs. Lane: [your-product-migrate.md](./your-product-migrate.md). Not Nucleify’s `web-astro/` ([nucleify-migrate.md](./nucleify-migrate.md)).

**Public mirrors:** [Migrate FAQ](https://docs.nucleify.io/en/docs/getting-started/migrate-faq) · [llms.txt](https://docs.nucleify.io/llms.txt).

## Can I migrate any existing Next.js app to Nuxt (or Nuxt → Next)?

**Yes.** Bring the project **as-is**. Run product convert with `--path` or `--git`. No rewrite into `*.nuc.tsx`, no prior `shared_modules` refactor, no Nucleify tokens, no IR-first rewrite of the app.

```bash
export PATH="$PWD/.config/bin:$PATH"
nuc emit convert web --target=next --path=/path/to/your-app --out=my-next --force
```

See [your-product-convert.md](./your-product-convert.md) · [your-product-gates.md](./your-product-gates.md).

## Do I need `*.nuc.tsx` first?

**No.** Portable `*.nuc.tsx` is optional shared presentational UI only — never a migrate prerequisite.

## Do I need to put domain logic in `shared_modules` first?

**No.** That layout is a Nucleify nucleus benefit when you join the monorepo. It is **not** a gate for converting your existing app.

## Does Framer Motion / Radix / react-query block migrate?

**No.** Do not invent library bans as a hard “cannot migrate.” Convert takes the framework tree as-is; smoke-build / follow-up polish is ordinary engineering, not a rewrite gate.

## Is `web-astro` / `make web TARGET=astro` my migration?

**No.** Those are **nucleify** shells — converting Nucleify’s own `web/` / `admin/`. Your app lands under `--out` ([your-product-shells.md](./your-product-shells.md)).

## Where do I run convert?

From a **Nucleify monorepo root** (aliases resolve). Point `--path` / `--git` at your app. Published CLI: `@nucleify/cli` / [cli.nucleify.io](https://cli.nucleify.io) — [your-product-cli.md](./your-product-cli.md).

## What do I get after convert?

Idiomatic host source under `--out`, yours to commit and run. Install with `pnpm install --ignore-workspace` in that tree — [your-product-after-convert.md](./your-product-after-convert.md).

## Which `--target` should I pick?

`next` · `solid` · `svelte` · `astro` — destination host family. Pick the stack you want to **land on**. Details: [your-product-targets.md](./your-product-targets.md).
