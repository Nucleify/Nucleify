# Modules Laravel -> Supabase compatibility map

This tracks module behavior replacement after restoring deleted module files.

## Shared API replacement

- Legacy module API routes are replaced by a Supabase-backed gateway:
  - `nuxt/server/api/[...slug].ts`
- Gateway uses Supabase (service role) and maps legacy endpoints used by modules:
  - entities (`articles`, `contacts`, `money`)
  - structural (`questions`, `technologies`)
  - files (`files`)
  - users (`user`, `users`, avatar/preferences/password flows)
  - activity (`activity-log`)
  - colors (`user-colors`)
  - friendship (`friendship/all`, `friendship/send-request/*`, `friendship/accept-request/*`, `friendship/deny-request/*`, `friendship/remove/*`, `friendship/block/*`, `friendship/unblock/*`)
  - share (`share`, `share/*`)
  - translations (`translations`, `translations/batch`, `translations/categories/*`)
  - module manager (`modules/all`, `modules/install`, `modules/uninstall`, `modules/toggle`, `modules/*`)
  - pagebuilder (`page-builder/preferences`, `page-builder/pages/*`, `page-builder/render/*`)
  - contact form (`contact-form`)
  - terminal (`terminal`, `artisan` compatibility alias)

## Module-specific Supabase replacements already added

- `modules/nuc_auth`
  - `modules/nuc_auth/supabase/migrations/20260430000003_auth_profiles.sql`
  - `modules/nuc_auth/atomic/bosons/utils/supabase_auth.ts`

- `modules/nuc_colors`
  - `modules/nuc_colors/supabase/migrations/20260430000002_user_colors.sql`
  - `modules/nuc_colors/supabase/functions/user-colors/index.ts`

- `modules/nuc_users`
  - `modules/nuc_users/supabase/migrations/20260430000004_user_profiles_and_avatars.sql`
  - `modules/nuc_users/supabase/functions/users/index.ts`

- `modules/nuc_terminal`
  - `modules/nuc_terminal/utils/send_backend_command.ts`
  - `supabase/functions/terminal/index.ts`

- Module-owned migrations (moved from root `supabase/migrations`)
  - `modules/nuc_activity/supabase/migrations/20260430000001_audit_logs.sql`
  - `modules/nuc_sections/supabase/migrations/20260430000005_contact_form_submissions.sql`
  - `modules/nuc_entities/supabase/migrations/20260430000006_entities_tables.sql`
  - `modules/nuc_entities_structural/supabase/migrations/20260430000006_structural_tables.sql`
  - `modules/nuc_files/supabase/migrations/20260430000006_files_table.sql`
  - `modules/nuc_languages/supabase/migrations/20260430000006_translations_table.sql`
  - `modules/nuc_modules/supabase/migrations/20260430000006_modules_table.sql`
  - `modules/nuc_friendship/supabase/migrations/20260430000006_friendships_table.sql`
  - `modules/nuc_share/supabase/migrations/20260430000006_share_requests_table.sql`
  - `modules/nuc_pagebuilder/supabase/migrations/20260430000006_pagebuilder_tables.sql`

## Runtime switch

- API base now defaults to Nuxt server API gateway:
  - `.config/nuxt/runtime.ts` -> `public.apiUrl = '/api'`

## Deploy note (module migrations, no copying)

- Migrations stay in `modules/*/supabase/migrations` (no sync to root).
- Apply to linked (remote) project:
  - `pnpm supabase:migrations:apply:linked`
- Apply to local DB:
  - `pnpm supabase:migrations:apply:local`
