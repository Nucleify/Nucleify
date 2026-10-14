# Investor page (`/{lang}/investor`)

## What
Full-viewport investor pitch at `web/src/pages/investor/`, routed via `web/src/pages/[lang]/investor.vue`. Same marketing shell as home (shear / iris / rail snap / wipe reveals / rainbow accents).

## Sections
1. **Intro** — short pitch + at-a-glance plate (`7 → 1`, modeled savings)  
2. **Thesis** — rewrite / stack-churn tax  
3. **Savings** — illustrative sprint & $ model (labeled, not audited)  
4. **Wedge** — GTM pipeline: Land → Stick → Expand → Monetize  
5. **Surface** — four capital surfaces (Coverage strip)  
6. **Ask** — CTA slides pitch aside and expands commercial intro form → `/api/contact-form` (same API values as home; optional name/note → `message`)

## Intro (investor conversion pass)
**Left — minimal pitch**
- Eyebrow `Investor brief`, headline `Stop paying for rewrites.`
- One short support line; CTAs: Request intro / See product / Read the thesis
- No KPI strip on the hero

**Right — at-a-glance plate** (`.nuc-inv-glance`)
- `7 → 1` (frameworks → codebase)
- `$180k–$320k / year kept` (tied to `NUC_INVESTOR_SAVINGS` dollars)
- One sentence + stack list + illustrative note
- Data: `NUC_INVESTOR_GLANCE` (replaces compare / ledger / deal card)

**SEO** — title `Nucleify Investor Brief — One Codebase, Every Framework`  
**Shells** — always Vue · React · Nuxt · Next · Astro · Svelte · Solid (never React/Next-only or Vue/Nuxt-only)


## Contact UX (home Close + investor Ask)
- No `nui-dialog` — inline `is-form` stage: pitch fades/slides left, commerce panel enters from the right
- Escape / Back resets; trust strip under submit
- Home Close mirrors the same pattern with product-facing copy
- Scroll gate (`bind_home_section_scroll_gate.ts`): on mobile, only sections taller than the viewport must reach bottom before the next gesture advances; short sections keep normal snap (Nuxt + Next home/investor)

## Next (product convert)
- **Source of truth:** `web/` (Nuxt/Vue). `web-next/` is gitignored — regenerate after Vue polish:
  ```bash
  pnpm compiler -- convert web --target=next
  ```
- App route: `web-next/src/app/[lang]/investor/page.tsx` → `@/views/investor`
- Bare `/investor` redirects to `/en/investor` (next.config)
- `[lang]` is constrained to `en|pl|vn` so `/investor` is not treated as a locale
- `nui-rainbow` CE: dynamic `import()` in `web-next/src/lib/nucleify-ui-provider.tsx` (top-level import extends `HTMLElement` and breaks SSR); layout only loads `nui-rainbow/styles.css` + body class

### Parity check (2026-09-21)
Re-ran convert after investor polish. Verified on Next emit:
- Intro emit cubes + `NUC_INVESTOR_DEAL.source*` (no Without/Nucleus panel)
- `content.ts` / scroll gate / wedge (no moat) match Vue
- Ask + home Close `is-form` slide + Escape + trust
- Investor `_index.scss` includes emit cubes, wedge rail, form stage

## Motion
`play_investor_animations.ts` — slim home engine: cipher brand, iris wipe, magnetic shear, section wipe reveals. Reuses home section observer / contact helpers.

## Routing
- Route rules: `/investor` → `/en/investor`
- Smash middleware leaves `/{lang}/investor` alone; extras collapse to that root

## Verify
- Nuxt: `/en/investor` (bare `/investor` 301 → `/en/investor`)
- Next (local host): same paths after convert; rail; Ask/Close slide forms
- `pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests`
