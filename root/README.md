# @nucleify/root

Nuxt landing app (marketing site) — **canonical product shell** (`TARGET=nuxt`).

Other frameworks (`make root TARGET=next`, …) are reserved for compiler tryb B (not implemented yet).

- `.cursor/agents/` — shared agents for the monorepo
- Rules: monorepo `.config/rules/` + `root/.config/rules/`
- Overrides: monorepo `overrides/root/`
- Shared packages: monorepo `shared_modules/`

```bash
make root                 # Nuxt (default TARGET=nuxt)
make root TARGET=nuxt
pnpm --filter @nucleify/root nuxt
```

Portable UI demos (not this app): `make nuxt` / `make react` — see `portable/README.md`.
