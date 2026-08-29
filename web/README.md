# @nucleify/web

Nuxt landing app (marketing site) — **canonical product shell** (`TARGET=nuxt`).

Alternate shell (tryb B): `make web TARGET=next` → gitignored `next/web/`.

- `.cursor/agents/` — shared agents for the monorepo
- Rules: monorepo `.config/rules/` + `web/.config/rules/`
- Overrides: monorepo `overrides/web/`
- Shared packages: monorepo `shared_modules/`

```bash
make web                 # Nuxt (default TARGET=nuxt)
make web TARGET=nuxt
make web TARGET=next     # → next/web
pnpm --filter @nucleify/web nuxt
```

Portable UI demos (not this app): `make nuxt` / `make react` — see `portable/README.md`.
