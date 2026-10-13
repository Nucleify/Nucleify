import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const monorepo = join(here, '..')

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@': join(here, 'src'),
      modules: join(monorepo, 'shared_modules'),
      portable: join(monorepo, 'portable'),
      nucleify: join(here, 'src/nucleify.ts'),
    },
  },
})
