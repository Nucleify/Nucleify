# Admin CMS v2 — nav cutover (slice 9)

## What

Collections IA is canonical: Pages, Media, Redirects, Users (+ Roles). Legacy `/cms` and `/users` redirect into the new paths. Thin markdown CMS UI is deprecated in the rail.

## Why

Editors should land on JSON documents, not the transitional markdown collection.

## Redirects

| From | To |
|------|----|
| `/[lang]/cms` | `/[lang]/collections/pages` |
| `/[lang]/cms/:slug` | `/[lang]/collections/pages` |
| `/[lang]/users` | `/[lang]/collections/users` |
| `/[lang]/users/:id` | `/[lang]/collections/users/:id` |

Markdown API (`/api/admin/cms`) remains for now; UI entry points are removed from nav.

## Verify

```sh
pnpm --filter @nucleify/admin dev
# open /en/cms → lands on Pages; /en/users → Collections/Users
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
