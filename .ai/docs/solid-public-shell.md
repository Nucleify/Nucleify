# Solid marketing shell (`web-solid`)

`web` → Solid convert uses the same CMS slug model as Nuxt and Next:

- Router: `/:lang/:slug` in `src/App.tsx` (redirect `/` → `/en/home`, `/:lang` → `/:lang/home`)
- Layout: `src/layout/public-shell.tsx` via `writeWebPublicShellSolid`
- Host barrel: `src/web-host.ts` (alias `@web` → local barrel; same import style as Nuxt)
- Legacy per-page `views/home` / `views/investor` emit is purged

Regenerate: `pnpm compiler -- convert web --target=solid --force` or `make web TARGET=solid`.
