import path from 'node:path'
import { fileURLToPath } from 'node:url'

import fs from 'node:fs'

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../..'
)

const isDev = process.env.NODE_ENV !== 'production'

function parseEnvLine(line: string): { key: string; value: string } | null {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return null

  const withoutExport = trimmed.startsWith('export ')
    ? trimmed.slice(7).trim()
    : trimmed

  const eq = withoutExport.indexOf('=')
  if (eq === -1) return null

  const key = withoutExport.slice(0, eq).trim()
  if (!key) return null

  let value = withoutExport.slice(eq + 1).trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }

  return { key, value }
}

function applyEnvFile(filePath: string, onlyMissing: boolean): void {
  if (!fs.existsSync(filePath)) return

  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const parsed = parseEnvLine(line)
    if (!parsed) continue
    if (!onlyMissing || process.env[parsed.key] === undefined) {
      process.env[parsed.key] = parsed.value
    }
  }
}

export function ensureServerEnv(): void {
  const mode = process.env.NODE_ENV || 'development'
  const files = ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]

  for (const file of files) {
    applyEnvFile(path.join(repoRoot, file), !isDev)
  }
}

export function readServerEnv(key: string): string {
  return process.env[key] ?? ''
}
