import { config as loadEnv } from 'dotenv'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

loadEnv({
  path: resolve(fileURLToPath(new URL('.', import.meta.url)), '../../.env'),
})
