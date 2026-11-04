# Admin CMS v2 — visual system (slice 1)

## What

Charcoal/black admin shell with **radius 0**, Collections / Globals rail groups, and a stub `DocumentHeader` (Preview / Save draft / Publish).

## Why

Schema-driven CMS UI needs a dense, sharp chrome before field registry and JSON documents land.

## Changes

| Area | Detail |
|------|--------|
| Tokens | `admin/src/assets/admin.scss` — `#0a0a0a` shell, hairline `#2a2a2a`, white primary CTA, `--admin-radius: 0`, nui radius vars forced to `0` |
| Rail | `AdminRail.vue` — Dashboard + **Collections** (Users, Roles, CMS) + **Globals** (Settings) |
| Topbar | `AdminTopbar.vue` |
| Document | `DocumentHeader.vue` — wired on CMS entry edit; Preview disabled until later slice |
| Language | Removed external-CMS branding from admin chrome comments / agent notes |

## Verify

```sh
pnpm --filter @nucleify/admin dev
# open /en — rail groups, square panels; /en/cms/:slug — document header actions
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```

Manual: no rounded rail links/panels/badges; draft vs publish on CMS entry updates status.
