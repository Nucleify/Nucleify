# Admin CMS v2 — Media + Redirects (slice 7)

## What

Media library (dropzone upload → `cms-media` bucket + `cms_media` rows) and redirects CRUD. `FieldMediaRef` picks a media id for schema fields (`upload` / `relationship` → media).

## Why

Page props need stable media ids; redirects belong in CMS, not only edge config.

## API

| Area | Paths | Perms |
|------|-------|-------|
| Media | `GET/POST /api/admin/media`, `PATCH/DELETE /api/admin/media/:id` | `media.read` / `media.write` |
| Redirects | `GET/POST /api/admin/redirects`, `PATCH/DELETE …/:id` | `cms.read` / `cms.write` |

Upload body: `{ filename, mime, size, alt, contentBase64 }` (data URL or raw base64).

SQL: `…/migrations/20261024000040_nuc_admin_cms_redirects.sql` (table + `cms-media` bucket).

## UI

- `/[lang]/collections/media`
- `/[lang]/collections/redirects`

## Verify

```sh
pnpm supabase:migrations:apply:local
pnpm --filter @nucleify/admin dev
# Media → drop file → Upload; Redirects → create /old → /new
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
