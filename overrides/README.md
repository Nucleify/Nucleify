# Overrides

This folder contains files that override originals from `nuxt/` and `modules/` without editing core source.

## How it works

1. **Folder structure** — mirror the original path under `overrides/`:
   - `overrides/nuxt/` — overrides files from `nuxt/`
   - `overrides/modules/` — overrides files from `modules/`

2. **Frontend examples** (Nuxt / TypeScript / Vue):
   - Original: `nuxt/composables/useAuth.ts`
   - Override: `overrides/nuxt/composables/useAuth.ts`

   Or:
   - Original: `modules/nuc_auth/atomic/pages/Login/index.vue`
   - Override: `overrides/modules/nuc_auth/atomic/pages/Login/index.vue`

3. **Backend examples** (Supabase API handlers):
   - Original: `modules/nuc_auth/supabase/api/handle.ts`
   - Override: `overrides/modules/nuc_auth/supabase/api/handle.ts`

   Or:
   - Original: `modules/nuc_entities/supabase/seeders/20260501000000_nuc_entities_seeder.sql`
   - Override: `overrides/modules/nuc_entities/supabase/seeders/20260501000000_nuc_entities_seeder.sql`

4. **Automatic resolution**:
   - **Frontend**: imports are redirected to override files; originals are excluded from the build
   - **Server handlers**: `modules/*/supabase/api/*.ts` resolved the same way when imported by the API gateway

## Notes

- Override paths must match originals exactly
- Overrides **fully replace** the original file (no merging)
- Copy only what you need to change
- Test after upgrades — overrides can break when upstream paths change

## Module documentation

See [`nuc_overrides`](../modules/nuc_overrides/README.md) for implementation details.
