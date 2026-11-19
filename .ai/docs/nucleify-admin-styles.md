# Admin styles

## Layout

- Tokens / reset: `admin/src/assets/admin.scss` (Nuxt `css[]`).
- Shared primitives (chips, table, toolbar, drawer, media cards, control buttons): `admin/src/components/ui/primitives.scss`, pulled in via `@use` from `admin.scss`.
- Screen- or component-local rules live in the owning Vue SFC `<style lang="scss">` (unscoped when other routes reuse the same class names only if those classes are also listed in `primitives.scss`).

## Why `@use` (not a second Nuxt `css` entry)

Nuxt’s `css[]` entry for `~/components/ui/primitives.scss` did not land in the virtual CSS bundle during admin refactor. Keep primitives on the `admin.scss` graph so every admin route gets chips / tables / drawers without visiting `collection_list` first.

## Verify

1. `make admin` → open a page creator with sections collapsed.
2. Section toggles use dark `--admin-surface-2` chips (not browser-default light buttons).
3. Pages / media list filter chips and bulk bar still look charcoal.
