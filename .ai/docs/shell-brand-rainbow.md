# Shell-brand rainbow cycle

Landing hue cycle no longer walks a full 360° rainbow. It holds on shell brand hues:

| Hue | Shells |
|-----|--------|
| 152deg | Vue / Nuxt (light green) |
| 190deg | React / Next (cyan) |
| 292deg | Astro (purple) |
| 375deg | Svelte (red, 15deg + 360) |

## Where

- `web/src/assets/_index.scss` — `nuc-rainbow-shell-cycle` drives `--rainbow-hue`
- `web/src/app.vue` — `applyRainbow(..., { cycle: 'branded' })`
- Holo cube companions use +38deg / +140deg (cyan / purple from Vue green)
- `shared_modules/nuc_animations/constants/rainbow.ts` — shared hue tokens
- Compiler product convert scaffolds use `cycle: 'branded'`

## Verify

Open the home hero and watch primary/CTA/cube shift green → cyan → purple → red over ~30s.
