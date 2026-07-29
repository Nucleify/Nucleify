import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../../', import.meta.url).pathname
const dest = join(root, '.cursor/rules')

rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })

const sources = [
  { src: '.config/rules', prefix: '' },
  { src: 'root/.config/rules', prefix: 'root.' },
  { src: 'admin/.config/rules', prefix: '' },
  { src: 'docs/.config/rules', prefix: '' },
  { src: 'compiler/.config/rules', prefix: '' },
  { src: 'shared_modules/.config/rules', prefix: 'shared.' },
]

for (const { src, prefix } of sources) {
  const srcDir = join(root, src)
  let files
  try {
    files = readdirSync(srcDir)
  } catch {
    continue
  }
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdc')) continue
    copyFileSync(join(srcDir, file), join(dest, prefix + file))
  }
}

console.log('[sync-rules] .cursor/rules synced')
