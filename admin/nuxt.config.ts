import './.config/nuxt/load-env'

import { cpSync, existsSync, lstatSync, readdirSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(process.cwd(), '..')
const adminSrc = resolve(process.cwd(), 'src')

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
    '@web': resolve(root, 'web/src'),
    '@admin': adminSrc,
    '@shared_modules': resolve(root, 'shared_modules'),
    '@portable': resolve(root, 'portable'),
    'portable/nui': resolve(root, 'portable/nui'),
    modules: resolve(root, 'shared_modules'),
    'modules/*': resolve(root, 'shared_modules/*'),
    nuc_api: resolve(root, 'shared_modules/nuc_api/supabase/api/server.ts'),
    nuc_server: resolve(adminSrc, 'server/nuc_server.ts'),
    nucleify: resolve(root, 'shared_modules/index.ts'),
  },
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    authEmailResendKey: process.env.AUTH_EMAIL_RESEND_KEY || '',
    authEmailFrom: process.env.AUTH_EMAIL_FROM || 'business@nucleify.io',
    contactFormRecipient:
      process.env.CONTACT_FORM_EMAIL || 'business@nucleify.io',
    public: {
      appUrl: process.env.NUXT_PUBLIC_ADMIN_URL || 'https://admin.nucleify.io',
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
    alias: {
      '@web': resolve(root, 'web/src'),
      '@admin': resolve(adminSrc, 'index.server.ts'),
      '@shared_modules': resolve(root, 'shared_modules/index.server.ts'),
      '@portable': resolve(root, 'portable'),
      nuc_api: resolve(root, 'shared_modules/nuc_api/supabase/api/server.ts'),
      nuc_server: resolve(adminSrc, 'server/nuc_server.ts'),
    },
  },
  hooks: {
    'nitro:build:public-assets': (nitro: {
      options: {
        rootDir: string
        output: { publicDir: string; serverDir: string }
      }
    }) => {
      const publicDir = join(nitro.options.rootDir, 'public')
      const outputDir = nitro.options.output.publicDir
      if (existsSync(publicDir)) {
        for (const entry of readdirSync(publicDir, { withFileTypes: true })) {
          if (entry.name.startsWith('.')) continue
          const srcPath = join(publicDir, entry.name)
          const destPath = join(outputDir, entry.name)
          try {
            if (existsSync(destPath) || lstatSync(destPath, { throwIfNoEntry: false })) {
              rmSync(destPath, { recursive: true, force: true })
            }
            cpSync(srcPath, destPath, {
              recursive: true,
              dereference: true,
              force: true,
            })
          } catch {
            // Ignore if already copied by Nitro
          }
        }
      }
    },
  },
  devServer: {
    port: Number(process.env.ADMIN_PORT || 8888),
  },
})
