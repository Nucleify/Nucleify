import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { DOC_CATEGORIES } from '../../modules/nuc_documentation/constants/documentation'
import { DOC_LANGUAGES } from '../../modules/nuc_documentation/constants/languages'

const root = resolve(fileURLToPath(import.meta.url), '../../..')

function getDocumentationPrerenderRoutes(): string[] {
  const routes: string[] = []

  for (const { code } of DOC_LANGUAGES) {
    routes.push(`/${code}/docs`)
    for (const category of DOC_CATEGORIES) {
      for (const page of category.pages) {
        routes.push(`/${code}/docs/${category.slug}/${page.slug}`)
        routes.push(
          `/api/documentation/markdown/${code}/${category.slug}/${page.slug}`
        )
      }
    }
  }

  return routes
}

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
    prerender: {
      crawlLinks: false,
      failOnError: true,
      routes: getDocumentationPrerenderRoutes(),
    },
  },
}
