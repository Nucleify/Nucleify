import './.config/nuxt/load-env'

import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'node:path'

const root = resolve(process.cwd(), '..')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'src',
  serverDir: 'src/server',
  // Bundle nui tokens with the render-blocking sheet (not only the client plugin chunk).
  css: [
    'nucleify-ui/styles/variables.css',
    'nucleify-ui/styles/global.css',
    resolve(root, 'portable/nui/tokens.css'),
    '~/assets/admin.scss',
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('nui-'),
    },
  },
  alias: {
    'portable/nui': resolve(root, 'portable/nui'),
    modules: resolve(root, 'shared_modules'),
    'modules/*': resolve(root, 'shared_modules/*'),
    nuc_api: resolve(root, 'shared_modules/nuc_api/supabase/api/server.ts'),
    nuc_server: resolve(process.cwd(), 'src/server/nuc_server.ts'),
    nucleify: resolve(root, 'shared_modules/index.ts'),
  },
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    public: {
      appUrl: process.env.NUXT_PUBLIC_ADMIN_URL || 'http://localhost:3001',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api',
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || '',
      appEnv: process.env.APP_ENV || 'production',
    },
  },
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('nui-'),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare',
  },
  devServer: {
    port: Number(process.env.ADMIN_PORT || 3001),
  },
})
