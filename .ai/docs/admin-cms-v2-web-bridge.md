# Admin CMS v2 — web renderer bridge (slice 8)

## What

Public published page API + `PageRenderer` on `web` that maps `sections[].type` to registered Vue sections (`home.hero`, `home.pillars`).

## Why

Admin-authored PageLayout JSON should drive section order on the public site without editing section SFCs for composition.

## API

`GET /api/public/pages/:slug?locale=` — published `cms_documents` only (no auth).

## Web

| Piece | Path |
|-------|------|
| Renderer | `web/src/components/PageRenderer.vue` |
| Route | `/[lang]/pages/[slug]` |

Canonical home (`/[lang]/home`) stays on hardcoded composition; CMS preview/publish uses `/pages/:slug` until cutover.

## Verify

```sh
# Publish a pages document with slug `demo` and home.hero / home.pillars sections
curl -s "http://localhost:3000/api/public/pages/demo?locale=en"
# open /en/pages/demo
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
