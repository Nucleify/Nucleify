# @nucleify/root

Nuxt landing app (marketing site).

- `.cursor/agents/` — shared agents for the monorepo
- Rules: monorepo `.config/rules/root/` (agents in `.cursor/agents/`)
- Overrides: monorepo `overrides/root/`
- Shared packages: monorepo `shared_modules/`
- Shared bash scripts: monorepo `.config/bash/`

```bash
pnpm --filter @nucleify/root nuxt
# or from monorepo root:
pnpm nuxt
```
