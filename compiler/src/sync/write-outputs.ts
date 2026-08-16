import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import type { IrDocument } from '../ir/types'
import { emitReact } from '../emit/react'
import { emitCssBody, emitVue } from '../emit/vue'
import { biomeFormat } from './biome-format'
import {
  contentHash,
  cssHeader,
  normalizeBody,
  reactHeader,
  stripEmitHeaders,
  vueHeader,
  type EmitKind,
} from './fingerprint'
import { toRepoRelative } from './discover'

export type WriteTarget = 'vue' | 'react' | 'all'
export type EmitApp = 'vue' | 'react' | 'nuxt' | 'next'

/**
 * Emit destinations under the monorepo root (gitignored demo apps).
 */
export const EMIT_APP_DIRS: Record<EmitApp, string> = {
  vue: 'vue/src/components',
  react: 'react/src/components',
  nuxt: 'nuxt/components',
  next: 'next/src/components',
}

const APP_FRAME: Record<EmitApp, 'vue' | 'react'> = {
  vue: 'vue',
  nuxt: 'vue',
  react: 'react',
  next: 'react',
}

const PRODUCT_SOURCE_PREFIXES = ['web/', 'admin/'] as const

export type WriteOutputsOpts = {
  cwd: string
  sourcePath: string
  ir: IrDocument
  target?: WriteTarget
  /** Limit to these demo apps (default: every app folder that already exists). */
  apps?: EmitApp[]
  force?: boolean
}

export type WriteResult = {
  written: string[]
  skipped: string[]
}

async function finalizeEmit(
  cwd: string,
  filePath: string,
  kind: EmitKind,
  rawBody: string,
  headerFn: (hash: string) => string,
): Promise<string> {
  let body = normalizeBody(await biomeFormat(rawBody, filePath, cwd))
  let hash = contentHash(body)
  let assembled = `${headerFn(hash)}${body}\n`
  assembled = await biomeFormat(assembled, filePath, cwd)
  assembled = assembled.replace(/\r\n/g, '\n')

  if (kind === 'react') {
    assembled = ensureReactHeaderOrder(assembled)
  }

  const bodyAfter = normalizeBody(stripEmitHeaders(assembled, kind))
  if (bodyAfter !== body) {
    body = bodyAfter
    hash = contentHash(body)
    assembled = `${headerFn(hash)}${body}\n`
    assembled = await biomeFormat(assembled, filePath, cwd)
    assembled = assembled.replace(/\r\n/g, '\n')
    if (kind === 'react') {
      assembled = ensureReactHeaderOrder(assembled)
    }
  }

  return assembled
}

function ensureReactHeaderOrder(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const headers: string[] = []
  let useClient: string | null = null
  const rest: string[] = []
  let inHeader = true
  for (const line of lines) {
    if (inHeader && /^\/\/\s*@(?:generated)/.test(line)) {
      headers.push(line)
      continue
    }
    if (inHeader && /^\/\/\s*editable;/.test(line)) {
      headers.push(line)
      continue
    }
    if (inHeader && /^\/\/\s*content-hash:/.test(line)) {
      headers.push(line)
      continue
    }
    if (inHeader && /^'use client'\s*;?\s*$/.test(line)) {
      useClient = "'use client'"
      continue
    }
    inHeader = false
    rest.push(line)
  }
  const ordered = [...headers]
  if (useClient) ordered.push(useClient)
  if (ordered.length) ordered.push('')
  while (rest[0] === '') rest.shift()
  return `${[...ordered, ...rest].join('\n').replace(/\n+$/, '\n')}`
}

function emitBaseName(sourcePath: string): string {
  return basename(sourcePath).replace(/\.nuc\.tsx$/, '')
}

function isProductSource(cwd: string, sourcePath: string): boolean {
  const rel = toRepoRelative(cwd, sourcePath)
  return PRODUCT_SOURCE_PREFIXES.some((prefix) => rel.startsWith(prefix))
}

function resolveApps(cwd: string, target: WriteTarget, apps?: EmitApp[]): EmitApp[] {
  const all = (Object.keys(EMIT_APP_DIRS) as EmitApp[]).filter((app) => {
    const frame = APP_FRAME[app]
    if (target === 'vue' && frame !== 'vue') return false
    if (target === 'react' && frame !== 'react') return false
    if (apps?.length) return apps.includes(app)
    return existsSync(join(cwd, app))
  })
  return all
}

async function writeFileEmit(
  cwd: string,
  filePath: string,
  kind: EmitKind,
  rawBody: string,
  headerFn: (hash: string) => string,
  written: string[],
): Promise<void> {
  const out = await finalizeEmit(cwd, filePath, kind, rawBody, headerFn)
  mkdirSync(join(filePath, '..'), { recursive: true })
  writeFileSync(filePath, out, 'utf8')
  written.push(filePath)
}

async function writeProductSiblings(opts: {
  cwd: string
  sourcePath: string
  ir: IrDocument
  target: WriteTarget
  base: string
  cssFileName?: string
  cssBody?: string
  written: string[]
}): Promise<void> {
  if (!isProductSource(opts.cwd, opts.sourcePath)) return

  const dir = dirname(opts.sourcePath)
  const writeVue = opts.target === 'all' || opts.target === 'vue'
  const writeReact = opts.target === 'all' || opts.target === 'react'

  if (opts.cssFileName && opts.cssBody && (writeVue || writeReact)) {
    await writeFileEmit(
      opts.cwd,
      join(dir, opts.cssFileName),
      'css',
      opts.cssBody,
      (hash) => cssHeader(hash),
      opts.written,
    )
  }

  if (writeVue) {
    const vuePath = join(dir, `${opts.base}.vue`)
    const hint = toRepoRelative(opts.cwd, vuePath)
    await writeFileEmit(
      opts.cwd,
      vuePath,
      'vue',
      emitVue(opts.ir, { cssFileName: opts.cssFileName }),
      (hash) => vueHeader(hint, hash),
      opts.written,
    )
  }

  if (writeReact) {
    const reactPath = join(dir, `${opts.base}.tsx`)
    const hint = toRepoRelative(opts.cwd, reactPath)
    await writeFileEmit(
      opts.cwd,
      reactPath,
      'react',
      emitReact(opts.ir, { cssFileName: opts.cssFileName }),
      (hash) => reactHeader(hint, hash),
      opts.written,
    )
  }
}

/**
 * Write emit into existing demo apps and, for web/admin authoring, siblings next to source.
 */
export async function writeOutputs(opts: WriteOutputsOpts): Promise<WriteResult> {
  const cwd = resolve(opts.cwd)
  const sourcePath = resolve(opts.sourcePath)
  const target = opts.target ?? 'all'
  const base = emitBaseName(sourcePath)
  const written: string[] = []
  const skipped: string[] = []
  const apps = resolveApps(cwd, target, opts.apps)

  const cssFileName = opts.ir.styles?.css ? `${base}.css` : undefined
  const cssBody = opts.ir.styles?.css ? emitCssBody(opts.ir.styles.css) : undefined

  await writeProductSiblings({
    cwd,
    sourcePath,
    ir: opts.ir,
    target,
    base,
    cssFileName,
    cssBody,
    written,
  })

  for (const app of apps) {
    const componentsDir = join(cwd, EMIT_APP_DIRS[app])
    const frame = APP_FRAME[app]

    if (cssFileName && cssBody) {
      const cssPath = join(componentsDir, cssFileName)
      await writeFileEmit(cwd, cssPath, 'css', cssBody, (hash) => cssHeader(hash), written)
    }

    if (frame === 'vue') {
      const vuePath = join(componentsDir, `${base}.vue`)
      const hint = toRepoRelative(cwd, vuePath)
      await writeFileEmit(
        cwd,
        vuePath,
        'vue',
        emitVue(opts.ir, { cssFileName }),
        (hash) => vueHeader(hint, hash),
        written,
      )
    } else {
      const reactPath = join(componentsDir, `${base}.tsx`)
      const hint = toRepoRelative(cwd, reactPath)
      await writeFileEmit(
        cwd,
        reactPath,
        'react',
        emitReact(opts.ir, { cssFileName }),
        (hash) => reactHeader(hint, hash),
        written,
      )
    }
  }

  return { written, skipped }
}
