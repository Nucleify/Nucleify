# Marketing shell utils & templates

## Layout

One Nuxt layout owns the marketing chrome:

| Piece | Path |
|-------|------|
| Shell layout | `web/src/layouts/default.vue` |
| Page → shell state | `web/src/composables/use_shell_page.ts` |
| Public page + SEO | `web/src/composables/use_public_shell_page.ts` |
| Wired in | `web/src/app.vue` via `<NuxtLayout>` |

Marketing URLs share `web/src/pages/[lang]/[slug].vue` (`usePublicShellPage`). The layout renders shear, rail, scroller, sections, and motion. Shell variant: known slugs pin `product` / `pitch` / `thankYou`; others use `auto` from section types. SEO title/description come from CMS (hardcoded fallbacks for home / investor / thank-you).

Converted shells keep the same slug model: Next `app/[lang]/[slug]`, Solid Router `/:lang/:slug` (`writeWebPublicShellSolid` → `layout/public-shell.tsx`).

Iris boot on Next: RSC `loadPublicPage` (admin `NUC_API_ORIGIN`, 2s abort) seeds `initialPage` so first paint is CMS and iris runs once. Client skips refetch when SSR settled. Without SSR (Solid), wait for fetch settle (2s abort) then boot once; `playShellAnimations` re-arms `html.nuc-iris-boot` if the inline 4s safety cleared it. Reboot only when the section boot key changes.

## Utils (`web/src/utils/`)

| File | Role |
|------|------|
| `shell_motion.ts` | Shared iris / cipher / fade-wipe / quiet-boot helpers |
| `play_shell_animations.ts` | Boot player: `playShellAnimations(root, boot)` — iris / hero / thank-you assemble |
| `shell_section_reveal.ts` | Scroll reveal engine; sections call via `useShellSectionReveal` |
| `shell_scroll.ts` | Ready wait, active section, `scrollSection`, tall-section snap gate |
| `submit_contact_form.ts` | Contact form helpers |
| `is_lab.ts` | Lab / Lighthouse quiet boot (`isLabUserAgent`, `isAutomatedAudit`) |
| `hrefs.ts` | Marketing + docs URL builders |
| `donut_arcs.ts` | Shared SVG donut arcs (thesis equal slices, pillars share chart) |
| `smashed_url.ts` | Legacy path redirects |

Section-local players live next to their section (e.g. `sections/pulse/player.ts`).

## Class prefix

Root shell is `.nuc-shell` (modifier `.is-pitch` for the pitch layout). CSS tokens use `--shell-*`.

## Templates

One folder per template (`index.vue` + `_index.scss`), same layout as sections:

- `web/src/templates/shear/`
- `web/src/templates/rail/`
- `web/src/templates/holo_cube/`
- `web/src/templates/module_board/`
- `web/src/templates/shell_boot/index.ts` — product / pitch boot options (no section reveals)

Section reveal specs live under `web/src/sections/*/motion.ts` (see `shell-section-motion.md`).

## Verify

```sh
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
