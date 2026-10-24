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

Manual: sign in with a Supabase Auth user → dashboard; sign out → login; unauthenticated `/en` redirects to login.

## Slices

| Slice | Status |
|-------|--------|
| A Auth shell | done |
| B Roles | pending |
| C Users | pending |
| D Settings | pending |
| E CMS | pending |
