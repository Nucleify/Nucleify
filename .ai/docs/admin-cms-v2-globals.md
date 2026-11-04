# Admin CMS v2 — Globals (slice 6)

## What

Singleton globals (site settings, header, footer) editable as JSON documents via schema forms.

## Why

Nav/footer and site-wide settings should live in CMS JSON, not hardcoded admin pages only.

## API

| Method | Path | Perm |
|--------|------|------|
| GET | `/api/admin/globals` | `cms.read` |
| GET | `/api/admin/globals/:slug?locale=` | `cms.read` |
| PATCH | `/api/admin/globals/:slug` | `cms.write` (settings also accepts `settings.write`) |

Empty locale creates on first save into `cms_global_documents`.

## UI

- Routes: `/[lang]/globals/settings|header|footer`
- Rail Globals group lists Site settings / Header / Footer; Account stays at `/settings`

## Verify

```sh
pnpm supabase:migrations:apply:local
pnpm --filter @nucleify/admin dev
# Globals → Header → edit links JSON array → Save draft
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
