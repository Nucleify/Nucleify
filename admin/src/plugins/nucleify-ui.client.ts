import { defineNuxtPlugin } from 'nuxt/app'
import { resolveThemeMode, setupNui } from 'portable/nui'

/**
 * Admin shell - portable/nui tokens + Lit registration.
 * Visual chrome via admin.scss (charcoal, radius 0); nui controls share tokens.
 * Awaits every `nui-*` custom element before the app mounts, then reveals
 * the page (`data-nui-ready`) so SSR does not flash empty hosts.
 */
export default defineNuxtPlugin({
  name: 'nucleify-ui',
  enforce: 'pre',
  async setup() {
    try {
      await setupNui({ palette: 'nuxt', mode: resolveThemeMode() })
      // Fonts use em-based nui padding - wait so placeholders do not jump on swap.
      // Cap wait: fonts.ready can hang if a webfont request never settles.
      if (document.fonts?.ready) {
        await Promise.race([
          document.fonts.ready.catch(() => undefined),
          new Promise<void>((resolve) => setTimeout(resolve, 1500)),
        ])
      }
      // One frame after upgrade so Lit shadow DOM can paint before reveal.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
    } finally {
      document.documentElement.setAttribute('data-nui-ready', '')
    }
  },
})