# Nuxt 4.6 / CLI remote-peer errors

`web` and `admin` use **Nuxt 4.6.3** (`@nuxt/cli` 4.x).

## Why

Nuxt CLI 3.x treated WebSocket/`ECONNRESET` as a fatal `unhandledRejection` and restarted `nuxt dev`, which refreshed the browser with no file change. CLI 4 ignores remote-peer codes (`ECONNRESET`, `EPIPE`, …) so the session stays up.

## Related typing

`useRequestEvent().node` is not on Workers-oriented `NuxtRequestEvent`. Cookie reads go through `useRequestHeader('cookie')` (see `shared_modules/nuc_colors/plugins/colors.server.ts`).

## Verify

```bash
pnpm -s --filter @nucleify/web exec node -e "console.log(require('nuxt/package.json').version)"
# expect 4.6.3; @nuxt/cli → 4.0.1
make web   # leave a tab open; should not loop "Restarting Nuxt due to error: read ECONNRESET"
```
