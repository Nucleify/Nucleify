# Admin CMS v2 — web renderer bridge (slice 8)

## What

Public published page API + shell layout on `web` that maps `sections[].type` to registered Vue sections (`section.hero`, `section.pillars`).

## Why

Admin-authored PageLayout JSON should drive section order on the public site without editing section SFCs for composition.

## API

`GET /api/public/pages/:slug?locale=` — published `cms_documents` only (no auth).

## Web

| Piece | Path |
|-------|------|
| Shell | `web/src/layouts/default.vue` (`.nuc-shell` bg / tokens / rail / boot) |
| Page state | `web/src/composables/use_shell_page.ts` |
| Sections | `web/src/sections/*` (shared marketing SFCs) |
| Templates | `web/src/templates/*` (shear, rail, holo cube, module board, …) |
| Route | `/[lang]/[slug]` (also `/[lang]/pages/[slug]`) |

Canonical home / investor (`/[lang]/home`, `/[lang]/investor`) load published layouts via `usePublicPage` (see `admin-cms-v2-web-cutover.md`). A published document with slug `test` is available at `/en/test` immediately and uses the same marketing shell as home. `smashed_url` only collapses known dead marketing paths — not arbitrary CMS slugs. Missing non-canonical slugs redirect to `/{lang}/home` (see `cms-slug-routing.md`).

## Verify

```sh
# Publish a pages document with slug `demo` and section.hero / section.pillars sections
curl -s "http://localhost:8888/api/public/pages/demo?locale=en"
# open /en/demo  (or /en/pages/demo)
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
