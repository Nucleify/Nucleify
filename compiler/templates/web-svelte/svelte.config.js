import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
export default {
  preprocess: vitePreprocess(),
  onwarn(warning, handler) {
    // Lit `nui-*` CEs are interactive; Svelte still treats them as static hosts.
    if (warning.code?.startsWith('a11y_') && /nui-/.test(warning.message ?? '')) return
    handler(warning)
  },
}
