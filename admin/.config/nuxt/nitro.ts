import { resolve } from 'node:path'

const root = resolve(process.cwd(), '..')
const adminSrc = resolve(process.cwd(), 'src')

export const nitroConfig = {
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
}
