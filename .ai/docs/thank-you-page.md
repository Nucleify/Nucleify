# Thank-you page

After a successful home or investor contact submit, the app navigates to `/{lang}/thank-you`.

- Page: `web/src/pages/thank-you/`
- Route: `web/src/pages/[lang]/thank-you.vue`
- Helper: `homeThankYouHref(lang)` in `web/src/pages/home/constants/content.ts`
- Bare `/thank-you` redirects to `/en/thank-you` via `web/.config/nuxt/site.ts`
- `smashed_url` treats `thank-you` as a living route (not collapsed to home)

## Motion

Uses the same `.nuc-home` iris shell as home (`nuc-iris-boot` → `--home-iris` wipe on `.nuc-home-inner` / `.nuc-home-shear`). Boot lives in `play_thank_you_animations.ts`: iris open, Nucleify cipher decode, copy/CTA/cube assemble. The holo cube is `NucHomeHoloCube` from the home core board.
