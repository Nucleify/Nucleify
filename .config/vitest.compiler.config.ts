import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const monorepo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default defineConfig({
  root: path.join(monorepo, 'compiler'),
  test: {
    name: 'compiler',
    environment: 'node',
    include: ['tests/**/*.{test,spec}.ts'],
  },
})
