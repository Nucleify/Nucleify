import { config as loadEnv } from 'dotenv'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** `web/.config/nuxt` → monorepo root (where `.env` lives). */
const nuxtConfigDir = fileURLToPath(new URL('.', import.meta.url))
const monorepoEnv = resolve(nuxtConfigDir, '../../../.env')
const packageEnv = resolve(nuxtConfigDir, '../../.env')

// Prefer monorepo `.env`; fall back to `web/.env` if present.
if (existsSync(monorepoEnv)) {
  loadEnv({ path: monorepoEnv })
} else if (existsSync(packageEnv)) {
  loadEnv({ path: packageEnv })
}
