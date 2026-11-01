# Agent context budget

Fixed prompt cost is kept low: few always-on project rules; commit / PR / design rules load on demand. Source of truth is `.config/rules/` → `pnpm sync-rules` → `.cursor/rules/` (so every clone gets the same behaviour).

## Always on

- `product-language.mdc` — no planning jargon in product text
- `context.mdc` — do not bulk-read rule trees; do not duplicate rules as Cursor User Rules
- `replies.mdc` — concise chat replies

## On demand (`alwaysApply: false`)

- `commits.mdc` — when creating commits
- `pull-requests.mdc` — when creating PRs
- `frontend-design.mdc` — landing/marketing UI work
- `workflow.mdc` — non-trivial feature pipeline

## After clone / for maintainers

1. `pnpm install` (runs `sync-rules`) or `pnpm sync-rules`
2. In **Cursor Settings → Rules → User Rules**: remove the long personal copies of commit/PR/design/reply protocols if they duplicate project rules — otherwise every turn pays for both
