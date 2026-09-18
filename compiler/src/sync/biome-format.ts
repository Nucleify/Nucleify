import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

function walkToWorkspace(start: string): string | null {
  let dir = resolve(start)
  for (;;) {
    if (existsSync(join(dir, 'pnpm-workspace.yaml')) || existsSync(join(dir, 'biome.json'))) {
      return dir
    }
    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

function findMonorepoRoot(start: string): string {
  return (
    walkToWorkspace(start) ??
    walkToWorkspace(join(dirname(fileURLToPath(import.meta.url)), '../../..')) ??
    resolve(start)
  )
}

/**
 * Format code via monorepo `@biomejs/biome` (same as `pnpm write`).
 */
export async function biomeFormat(code: string, filePath: string, cwd = process.cwd()): Promise<string> {
  const root = findMonorepoRoot(cwd)
  const result = spawnSync(
    'pnpm',
    ['exec', 'biome', 'format', `--stdin-file-path=${filePath}`, '--'],
    {
      cwd: root,
      input: code,
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    },
  )

  if (result.status !== 0) {
    const err = (result.stderr || result.stdout || 'biome format failed').trim()
    if (err) {
      console.warn(`biome-format warn (${filePath}): ${err.split('\n')[0]}`)
    }
    return code.replace(/\r\n/g, '\n')
  }

  return (result.stdout ?? code).replace(/\r\n/g, '\n')
}
