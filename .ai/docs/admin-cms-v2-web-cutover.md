# Admin CMS — marketing pages cutover

## What

`/[lang]/home` and `/[lang]/investor` load published `cms_documents` layouts via `GET /api/public/pages/:slug` during SSR / prerender. Admin Collections → Pages owns section **order, copy, demo data, and layout props**. Vue section SFCs merge CMS props over `constants/content.ts` fallbacks.

## Why

Marketing composition and content are editable in admin without redeploying constants for every copy change.

## Pieces

| Piece | Path |
|-------|------|
| Widget registry + `adminFields` | `shared_modules/nuc_admin/cms/registry.ts`, `cms/widgets/` |
| Default layouts + full props | `cms/default_pages.ts`, `cms/defaults/marketing_props.ts` |
| Seed published `home` / `investor` | `…/seeders/20261024120000_nuc_admin_cms_default_pages_seeder.sql` |
| Web section map + bind | `web/src/cms/section_registry.ts` |
| SSR fetch + fallback | `web/src/composables/use_public_page.ts` |

## Fallback

If the public API fails or returns no sections, web uses `DEFAULT_*_SECTIONS` (full props). Per-field gaps still fall back to page constants.

## Admin

Edit Pages documents `home` / `investor` (locale `en`): reorder / add / remove widgets, edit Content / Data / Layout tabs, publish. See also `admin-cms-full-editability.md`.

## Verify

```sh
pnpm supabase:seeders:apply:local
curl -s "http://localhost:8888/api/public/pages/home?locale=en"
# open /en/home and /en/investor
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
