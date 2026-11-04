# Admin CMS v2 — schema + JSON documents (slice 3)

## What

Config-driven collection registry and JSON document storage in `nuc_admin`: `cms_documents` / `cms_global_documents` / `cms_media`, `FieldConfig` types, widget registry, `validate_layout`, and collection document API.

## Why

Page composition needs a single schema source for admin validate + future web allowlist, with PageLayout jsonb persisted through the gateway.

## SQL

- Migration: `shared_modules/nuc_admin/supabase/migrations/20261024000030_nuc_admin_cms_documents.sql`
- Perms seeder: `…/seeders/20261024000031_nuc_admin_cms_docs_perms_seeder.sql` (`cms.publish`, `media.read|write`)

```sh
pnpm supabase:migrations:apply:local
pnpm supabase:seeders:apply:local
```

## API

| Method | Path | Perm |
|--------|------|------|
| GET | `/api/admin/config` | `cms.read` |
| GET | `/api/admin/collections` | `cms.read` |
| GET/POST | `/api/admin/collections/:slug` | `cms.read` / `cms.write` |
| GET/PATCH/DELETE | `/api/admin/collections/:slug/:id` | `cms.read` / `cms.write` |
| POST | `/api/admin/collections/:slug/:id/publish\|unpublish` | `cms.publish` (fallback `cms.write`) |

Unknown `sections[].type` rejected on write. Legacy markdown `/api/admin/cms` unchanged.

## Registry

- `cms/admin_config.ts` — `pages` collection + settings/header/footer globals
- `cms/widgets/home_hero.ts`, `home_pillars.ts`
- `cms/validate_layout.ts` — whitelist + reorder by `order`

## Verify

```sh
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
# vitest: nuc_admin/vitests/validate_layout.test.ts
```
