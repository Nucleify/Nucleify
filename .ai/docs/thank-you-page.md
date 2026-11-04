# Thank-you page

After a successful home or investor contact submit, the app navigates to `/{lang}/thank-you`.

- Route: `web/src/pages/[lang]/[slug].vue` via `usePublicShellPage` (`variant: 'thankYou'`)
- Section: `web/src/sections/thank_you/` (`section.thank_you`)
- Cube template: `web/src/templates/holo_cube/index.vue`
- Bare `/thank-you` redirects to `/en/thank-you` via `web/.config/nuxt/site.ts`
- `smashed_url` treats `thank-you` as a living route (not collapsed to home)
- SEO prefers CMS `seo` fields; page is `noindex, follow`

## Motion

Uses the shared marketing shell (`layouts/default.vue` + `.nuc-shell` iris). Boot: `playShellAnimations(root, thankYouShellBoot)` from `web/src/sections/thank_you/motion.ts` (iris open, title cipher decode, copy/CTA/cube assemble).
