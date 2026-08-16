# @nucleify/web

Nuxt landing app (marketing site) — **canonical product shell** (`TARGET=nuxt`).

Other frameworks (`make web TARGET=next`, …) are reserved for compiler tryb B (not implemented yet).

- `.cursor/agents/` — shared agents for the monorepo
- Rules: monorepo `.config/rules/` + `web/.config/rules/`
- Overrides: monorepo `overrides/web/`
- Shared packages: monorepo `shared_modules/`

```bash
make web                 # Nuxt (default TARGET=nuxt)
make web TARGET=nuxt
pnpm --filter @nucleify/web nuxt
```

Portable UI demos (not this app): `make nuxt` / `make react` — see `portable/README.md`.
