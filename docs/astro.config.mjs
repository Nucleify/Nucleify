import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://docs.nucleify.io',
  srcDir: 'src',
  // Soft navigations via ClientRouter — prefetch linked docs on hover.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
})
