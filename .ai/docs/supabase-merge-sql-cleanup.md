# Supabase merge SQL cleanup

## What

`pnpm supabase:merge-sql` rebuilds `supabase/.temp/merged_{migrations,factories,seeders}.sql` from module sources only.

## Cleanup

| Change | Why |
|--------|-----|
| Languages seeder slimmed (~3k agency keys → auth/common/form/nav) | Marketing copy is in web constants + CMS pages |
| Languages factory is a real `factory_translation` | Removed `TODO migrate…` stub |
| Colors seeder no longer ALTER-patches tables | Schema stays in migrations |
| Merge script dropped dead `nuc_modules/generate-seeder.mjs` hook | Module does not exist |

## Rebuild

```sh
pnpm supabase:merge-sql
# then apply:
pnpm supabase:migrations:apply:linked
pnpm supabase:seeders:apply:linked
```
