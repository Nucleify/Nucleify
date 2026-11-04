# Investor page - home-grade redesign

Investor (`/[lang]/investor`) uses the same chrome as home (shear, rail, tokens, fonts) with investor-specific compositions under `nuc-*`.

## Sections

| Id | Class | Layout |
|----|-------|--------|
| intro | `nuc-hero` | Brand + investor headline; holo cube + open capital readout |
| thesis | `nuc-thesis` | Pitch + shell donut viz + three pillar cards |
| savings | `nuc-savings` | Copy + capital focus plate; two secondary metrics (no $ dupe) |
| wedge | `nuc-wedge` | Four phase cards (Land → Stick → Expand → Earn) |
| surface | `nuc-surface` | Colored spotlight + interactive reach tabs |
| ask | `nuc-close` | Same close section as home (open pitch ↔ form) |

## Files

- `web/src/sections/**` (investor section SFCs: intro, thesis, savings, wedge, surface, ask)
- `web/src/pages/investor/_index.scss`
- `web/src/templates/shell_boot/index.ts` (`pitchShellBoot`) + pitch section `motion.ts` reveals
- Copy / arcs in `constants/content.ts` (`nucInvestorShellArcs`)

## Hero iris + cube

Home boot used to set `.nuc-hero-panel { opacity: 0 }` until ready - that hid the investor deal cube through the whole iris wipe. Boot CSS now skips `.is-deal`; the panel stays painted and the iris clip alone covers → reveals the cube.

## Verify

```bash
make web
# http://localhost:7777/en/investor
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
