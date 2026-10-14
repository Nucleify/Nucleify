import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://docs.nucleify.io',
  srcDir: 'src',
  trailingSlash: 'never',
  // Prefetch docs HTML on hover for DocsSoftNav fetches.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
})
