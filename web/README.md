# @nucleify/web

Nuxt landing app (marketing site) - **canonical product shell** (`TARGET=nuxt`).

Alternate shells: `make web TARGET=next|solid|svelte` → gitignored `web-next/` / `web-solid/` / `web-svelte/`.

- `.cursor/agents/` - shared agents for the monorepo
- Rules: monorepo `.config/rules/` + `web/.config/rules/`
- Overrides: monorepo `overrides/web/`
- Shared packages: monorepo `shared_modules/`

```bash
make web                    # Nuxt (default TARGET=nuxt)
make web TARGET=nuxt
make web TARGET=next        # → web-next/
make web TARGET=solid       # → web-solid/
make web TARGET=svelte      # → web-svelte/
pnpm --filter @nucleify/web nuxt
```

Portable UI demos (not this app): `make vue` / `react` / `nuxt` / `next` / `solid` / `svelte` - see `portable/README.md`.
