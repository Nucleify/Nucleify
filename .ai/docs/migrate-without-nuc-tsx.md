# Messaging — migrate without `*.nuc.tsx`

Product copy and docs lead with **product convert**: bring an existing framework app and emit another shell. Portable `*.nuc.tsx` is **optional** shared presentational UI - not a migration gate.

## Surfaces updated

- Root `README.md`, `compiler/README.md`
- Docs EN/PL: introduction, compiler, philosophy, CLI typical flow
- Home / marketing defaults: hero, pillars, compiler_demo support, pulse, close, SEO
- Migrations-company engagement stick line
- `.ai/docs/home-developer-concretes.md`

## Verify

1. Docs bundle: `pnpm --filter @nucleify/docs generate:markdown-bundle`
2. CMS seed after copy edits: `pnpm exec vite-node --config vitest.config.ts .config/scripts/gen-cms-defaults.mts`
3. Home pillar titles include `Existing app → another shell`
