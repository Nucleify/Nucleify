# PageSpeed — home `/en/home`

## Mobile UX (no jump)
- Scroller keeps **`y mandatory`** section slides; tall-section gate never leaves inline `none` stuck.
- Gate releases snap **immediately** at section bottom; re-sync on `touchend` / `scrollend`.
- Hero CTAs are **native** `.nuc-home-btn` + Nuxt `<Icon>` (SSR SVG).
- Below-fold sections stay **async**; eager CSS keeps pillars at `opacity: 0` until reveal.

## FOUC / CLS
- Nuxt CSS stays **render-blocking**.
- Critical head CSS: dark shell + solid brand color (no `background-clip:text`).
- Google Fonts `display: optional`.

## Iris vs CWV
- **Never SSR `nuc-iris-boot`.** Iris at `0%` + hung JS = black mobile screen.
- **Lab:** SSR stamps `html.nuc-lab` from the *request* UA (`Chrome-Lighthouse`).
- **First visit:** paint open (`--home-iris: 165%`).

## Auto-refresh (do not regress)
- Nuxt `experimental.checkOutdatedBuildInterval: false` — no hourly `/_nuxt/builds/latest.json` poll.
- Nuxt `experimental.emitRouteChunkError: false` + `appManifest: false` — default chunk-reload was `location.reload()` on `vite:preloadError` (flaky mobile → ~10s reload loop via `nuxt:reload` TTL).
- Client plugin `no_preload_reload.client.ts` always `preventDefault()` on `vite:preloadError`.
- No scroll-past-end loop — home/investor stop at the last section.

## Out of repo
Disable Cloudflare Web Analytics (beacon) in the CF dashboard if it remains on the path.
