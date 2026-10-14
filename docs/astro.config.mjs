import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://docs.nucleify.io',
  srcDir: 'src',
  trailingSlash: 'never',
  // Browser link prefetch on load; DocsSoftNav also warms an in-memory HTML cache.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
})

