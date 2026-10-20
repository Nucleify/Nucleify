# Investor page - home-grade redesign

Investor (`/[lang]/investor`) uses the same chrome as home (shear, rail, tokens, fonts) with investor-specific compositions under `nuc-inv-*`.

## Sections

| Id | Class | Layout |
|----|-------|--------|
| intro | `nuc-inv-hero` | Brand + investor headline; holo cube + open capital readout |
| thesis | `nuc-inv-why` | Pitch + shell donut viz + three pillar cards |
| savings | `nuc-inv-keep` | Copy + capital focus plate; two secondary metrics (no $ dupe) |
| wedge | `nuc-inv-plan` | Four phase cards (Land → Stick → Expand → Earn) |
| surface | `nuc-inv-reach` | Colored spotlight + interactive reach tabs |
| ask | `nuc-home-close` | Same close section as home (open pitch ↔ form) |

## Files

- `web/src/pages/investor/sections/**`
- `web/src/pages/investor/_index.scss`
- `web/src/pages/investor/utils/play_investor_animations.ts`
- Copy / arcs in `constants/content.ts` (`nucInvestorShellArcs`)

## Hero iris + cube

Home boot used to set `.nuc-home-hero-panel { opacity: 0 }` until ready - that hid the investor deal cube through the whole iris wipe. Boot CSS now skips `.is-deal`; the panel stays painted and the iris clip alone covers → reveals the cube.

## Verify

```bash
make web
# http://localhost:3000/en/investor
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
