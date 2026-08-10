import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SCAFFOLD_APPS = ['vue', 'react', 'nuxt', 'next'] as const
export type ScaffoldApp = (typeof SCAFFOLD_APPS)[number]

function templatesRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), '../../templates')
}

/**
 * Wipe and recreate a simple demo app from `compiler/templates/<app>`.
 * Output dirs (`vue/`, `react/`, `nuxt/`, `next/`) are gitignored.
 */
export function scaffoldApp(app: ScaffoldApp, cwd = process.cwd()): string {
  if (!SCAFFOLD_APPS.includes(app)) {
    throw new Error(`unknown app "${app}"; expected one of ${SCAFFOLD_APPS.join(', ')}`)
  }
  const src = join(templatesRoot(), app)
  if (!existsSync(src)) {
    throw new Error(`missing template: ${src}`)
  }
  const dest = resolve(cwd, app)
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest, { recursive: true })
  return dest
}

export function scaffoldApps(apps: ScaffoldApp[], cwd = process.cwd()): string[] {
  return apps.map((app) => scaffoldApp(app, cwd))
}
