import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const config = require(join(__dirname, '.config', '.stylelintrc.json'))

export default config
