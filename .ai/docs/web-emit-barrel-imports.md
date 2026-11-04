# Web emit barrel imports

Converted web hosts (`web-astro`, `web-next`, `web-solid`, `web-svelte`) mirror Nuxt import style:

- App / section / shell code imports via `@web`, `@shared_modules`, `@portable` (no nested `@/cms/…` or `@/web-host`).
- Local host barrel: `src/web-host.ts`, resolved as `@web` (not Nuxt `web/src/index.ts`).
- Converted hosts resolve `@shared_modules` → `shared_modules/index.host.ts` (CMS, toast, browser Supabase client, admin helpers — no Vue / `nuxt/app`). Nuxt `web` keeps the full barrel via Nitro/`index.server.ts` as before.
- Barrel internals use relative `./…` re-exports (same pattern as `web/src/index.ts`).
- Sibling modules (`cms/`, `lib/`) use relative imports; shared symbols use `@shared_modules`.
- Convert shims (`useReactive`, Astro `useParams` / `useRouter`, Solid `useRef`) are re-exported from `@web`.
- Emit purges leftover Nuxt `src/index.ts` on Astro/Next/Solid so Vue SFCs are not pulled into the host graph.

Convert no longer rewrites `@web` → `@/web-host`. Legacy `@/web-host` and deep `modules/nuc_admin/…` paths are normalized to `@web` / `@shared_modules`.

Regenerate: `pnpm compiler -- convert web --target=astro --force` (and `next` / `solid` / `svelte` as needed).
