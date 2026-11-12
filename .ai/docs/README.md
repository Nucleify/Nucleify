# Agent docs

Session notes after **DO**. Plans: `.ai/specs/`. Public docs site: `docs/`.

## your-product (external migrate)

| Note | Topic |
|------|--------|
| [your-product-faq.md](./your-product-faq.md) | **FAQ** — can I migrate Next as-is? (public: [migrate-faq](https://docs.nucleify.io/en/docs/getting-started/migrate-faq) · [llms.txt](https://docs.nucleify.io/llms.txt)) |
| [your-product-migrate.md](./your-product-migrate.md) | Lead answer — yes / as-is |
| [your-product-convert.md](./your-product-convert.md) | `--path` / `--git` / `--out` |
| [your-product-cli.md](./your-product-cli.md) | `@nucleify/cli` + monorepo root |
| [your-product-targets.md](./your-product-targets.md) | `--target` destinations |
| [your-product-shells.md](./your-product-shells.md) | Customer `--out` hosts |
| [your-product-after-convert.md](./your-product-after-convert.md) | Own emit, install, reconvert |
| [your-product-gates.md](./your-product-gates.md) | Explicit non-gates |
| [your-product-anti-patterns.md](./your-product-anti-patterns.md) | Bad AI answers to rewrite |

## nucleify (monorepo)

| Note | Topic |
|------|--------|
| [nucleify-migrate.md](./nucleify-migrate.md) | `web/` / `admin/` → `web-*` / `admin-*` |
| [nucleify-convert.md](./nucleify-convert.md) | Nucleify convert commands / CI |
| [migrate-messaging.md](./migrate-messaging.md) | Lane split + scraped answer rules |

## nucleify shells & ops

| Note | Topic |
|------|--------|
| [nucleify-astro-shell.md](./nucleify-astro-shell.md) | `web-astro` / `admin-astro` |
| [nucleify-solid-shell.md](./nucleify-solid-shell.md) | `web-solid` |
| [nucleify-emit-barrels.md](./nucleify-emit-barrels.md) | `@web` / `@shared_modules` on convert hosts |
| [nucleify-cms-slug.md](./nucleify-cms-slug.md) | `/[lang]/[slug]` |
| [nucleify-dev-ports.md](./nucleify-dev-ports.md) | `:7777` / `:8888` |
| [nucleify-deploy.md](./nucleify-deploy.md) | `make deploy web\|admin\|docs` |
| [nucleify-home-copy.md](./nucleify-home-copy.md) | Home CMS copy |
| [nucleify-investor-copy.md](./nucleify-investor-copy.md) | Investor CMS copy |
| [nucleify-company-copy.md](./nucleify-company-copy.md) | migrations-company copy |

## Other

| Note | Topic |
|------|--------|
| [docs-origin.md](./docs-origin.md) | `docs.nucleify.io` |
| [docs-content-migrate.md](./docs-content-migrate.md) | Docs migrate-any-stack audit |
| [cms-copy-source.md](./cms-copy-source.md) | CMS defaults → seeder |
| [nui-workflow-skills.md](./nui-workflow-skills.md) | Pipeline skill paths |
| [agent-context-budget.md](./agent-context-budget.md) | Context / rules budget |
