import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const monorepo = join(here, '..')

export default defineConfig({
  plugins: [svelte()],
  appType: 'spa',
  server: { host: true },
  resolve: {
    alias: {
      '@': join(here, 'src'),
      modules: join(monorepo, 'shared_modules'),
      portable: join(monorepo, 'portable'),
      nucleify: join(here, 'src/nucleify.ts'),
    },
  },
})
