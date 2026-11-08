# @nucleify/web

Nuxt landing app (marketing site) - **canonical product host** (`--target=nuxt` / default).

Alternate hosts: `make web --target=next|solid|svelte|astro` → gitignored `web-next/` / `web-solid/` / `web-svelte/` / `web-astro/` (needs `PATH="$PWD/.config/bin:$PATH"`).

- `.cursor/agents/` - shared agents for the monorepo
- Rules: monorepo `.config/rules/` + `web/.config/rules/`
- Overrides: monorepo `overrides/web/`
- Shared packages: monorepo `shared_modules/`

```bash
export PATH="$PWD/.config/bin:$PATH"
make web                    # Nuxt (default)
make web --target=next      # → web-next/
make web -t=solid           # → web-solid/
make web --target=svelte    # → web-svelte/
make web --target=astro     # → web-astro/
# classic (no shim): make web TARGET=next
pnpm --filter @nucleify/web nuxt
```

Optional portable UI demos (not this app): `make vue` / `react` / `nuxt` / `next` / `solid` / `svelte` / `astro` - see `portable/README.md`. Product convert does **not** require `*.nuc.tsx`.
