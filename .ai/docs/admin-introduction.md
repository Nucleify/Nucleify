# Admin introduction

## What

Nuxt `@nucleify/admin` backoffice foundation: Payload-like chrome, Supabase email/password auth, session middleware, and a gateway catch-all mirroring `web/`.

Domain logic lives in `shared_modules/nuc_admin` (roles, users, CMS) as later slices land.

## Why

`admin/` was a stub. Product needs a usable shell before collections (users, roles, CMS).

## Design

Admin UI follows a **Payload CMS** layout: dark left rail, muted content plane, collection lists, blue accent. Controls use `nucleify-ui` via `portable/nui`.

## Verify

```sh
pnpm --filter @nucleify/admin install
pnpm --filter @nucleify/admin dev
# open http://localhost:3001/en/login
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

Admin `nuc_server` must re-export the same gateway helpers as `web` (including `formatRowsResponseTimestamps`) — shared handlers import `nuc_server` from the host app.

Manual: sign in with a Supabase Auth user → dashboard; sign out → login; unauthenticated `/en` redirects to login.

## Slices

| Slice | Status |
|-------|--------|
| A Auth shell | done |
| B Roles | done (`nuc_admin` RBAC + `/roles`) |
| C Users | done (profiles CRUD + role assign) |
| D Settings | done (`/settings` profile + password + theme) |
| E CMS | done (markdown entries CRUD) |

### CMS (E)

- SQL: `…/migrations/20261024000020_nuc_admin_cms.sql`
- API: `GET/POST /api/admin/cms`, `GET/PATCH/DELETE /api/admin/cms/:slug?locale=`
- UI: `/[lang]/cms`, `/[lang]/cms/[slug]`

### Settings (D)

- API: `PATCH /api/admin/me` (display name, locale); password via Supabase Auth client
- UI: `/[lang]/settings` — theme stored in `localStorage` (`admin-theme`)

### Users (C)

- SQL: `…/migrations/20261024000010_nuc_admin_user_profiles.sql`
- API: `GET/POST /api/admin/users`, `GET/PATCH /api/admin/users/:id`
- UI: `/[lang]/users`, `/[lang]/users/[id]`

### Roles (B)

- SQL: `shared_modules/nuc_admin/supabase/migrations/20261024000000_nuc_admin_roles.sql`
- Seed: `…/seeders/20261024000001_nuc_admin_roles_seeder.sql`
- Gate: `utils/permissions.ts` (empty `user_roles` → bootstrap full access)
- API: `GET /api/admin/roles`, `GET /api/admin/permissions`, `PUT /api/admin/roles/:id/permissions`, `GET /api/admin/me`

```sh
pnpm supabase:migrations:apply:local
pnpm supabase:seeders:apply:local
```
