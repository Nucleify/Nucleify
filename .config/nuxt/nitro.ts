import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(import.meta.url), '../../..')

export const nitroConfig = {
  ssr: process.env.SSR === 'true',
  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare',
    alias: {
      nucleify: resolve(root, 'nuxt/atomic/nitro.ts'),
      nuc_api: resolve(root, 'modules/nuc_api/supabase/api/server.ts'),
      nuc_client: resolve(root, 'nuxt/nuc_client.ts'),
      nuc_server: resolve(root, 'nuxt/server/nuc_server.ts'),
    },
    externals: {
      inline: [
        'vue',
        'vue-router',
        '@unhead/vue',
        '@primevue/core/base/style',
        '@primevue/core/basecomponent/style',
      ],
    },
    prerender: false,
  },
}
