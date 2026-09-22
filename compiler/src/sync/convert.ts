import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { convertVueSfcToReact } from './vue-sfc-to-tsx'
import { reactTsxToSolidBody } from './react-to-solid'
import { emitBaseName } from './paths'
import {
  PRODUCT_IDS,
  SCAFFOLD_FRAMEWORKS,
  productShellPath,
  scaffoldProduct,
  type ProductId,
  type ScaffoldFramework,
} from './scaffold'
import { toRepoRelative } from './discover'

/** Products with a full Nuxt→{next|solid} convert pipeline (tryb B). */
export const CONVERT_PRODUCTS = ['web', 'admin'] as const
/** @deprecated use CONVERT_PRODUCTS */
export const NEXT_CONVERT_PRODUCTS = CONVERT_PRODUCTS
export type ConvertProductId = (typeof CONVERT_PRODUCTS)[number]
/** @deprecated use ConvertProductId */
export type NextConvertProduct = ConvertProductId

type ConvertConfig = {
  packageName: string
  title: string
  description: string
  entryModule: string
  redirectRoot?: string
  shellBg: string
  shellFg: string
  extraDeps: Record<string, string>
}

/** @deprecated use ConvertConfig */
type NextConvertConfig = ConvertConfig

const NEXT_CONVERT: Record<ConvertProductId, ConvertConfig> = {
  web: {
    packageName: '@nucleify/next-web',
    title: 'Nucleify',
    description: 'Nucleify web (Next host + React emit from Vue sources)',
    entryModule: '@/views/home/index',
    redirectRoot: '/en/home',
    shellBg: '#070908',
    shellFg: '#e7ebe8',
    extraDeps: { animejs: '^4.5.0', 'nui-rainbow': '^0.1.0' },
  },
  admin: {
    packageName: '@nucleify/next-admin',
    title: 'Nucleify Admin',
    description: 'Nucleify admin (Next host + React emit from Vue sources)',
    entryModule: '@/views/index',
    shellBg: '#0f1419',
    shellFg: '#e7ebe8',
    extraDeps: {},
  },
}

const SOLID_CONVERT: Record<ConvertProductId, ConvertConfig> = {
  web: {
    packageName: '@nucleify/solid-web',
    title: 'Nucleify',
    description: 'Nucleify web (Solid host + Solid emit from Vue sources)',
    entryModule: '@/views/home/index',
    redirectRoot: '/en/home',
    shellBg: '#070908',
    shellFg: '#e7ebe8',
    extraDeps: { animejs: '^4.5.0', 'nui-rainbow': '^0.1.0' },
  },
  admin: {
    packageName: '@nucleify/solid-admin',
    title: 'Nucleify Admin',
    description: 'Nucleify admin (Solid host + Solid emit from Vue sources)',
    entryModule: '@/views/index',
    shellBg: '#0f1419',
    shellFg: '#e7ebe8',
    extraDeps: {},
  },
}

const SKIP_COPY_NAMES = new Set([
  'node_modules',
  '.nuxt',
  '.output',
  '.git',
  'dist',
  '.turbo',
])

/** Nuxt route shells — App Router in `src/app/` owns these URLs. */
const SKIP_VUE_ROUTE_SHELLS: Partial<Record<NextConvertProduct, string[]>> = {
  web: [
    'pages/index.vue',
    'pages/[lang]/home.vue',
    'pages/[lang]/investor.vue',
    'pages/[lang]/index.vue',
  ],
}

const WEB_LOCALES = ['en', 'pl', 'vn'] as const

function normalizeSrcRel(rel: string): string {
  return rel.replace(/\\/g, '/')
}

/** Nuxt app shells — Next App Router layout/provider owns the document shell. */
const SKIP_VUE_APP_SHELLS = new Set(['app.vue', 'layouts/default.vue'])

function shouldSkipVueRouteShell(product: NextConvertProduct, relFromSrc: string): boolean {
  return SKIP_VUE_ROUTE_SHELLS[product]?.includes(normalizeSrcRel(relFromSrc)) ?? false
}

function shouldSkipVueEmit(product: NextConvertProduct, relFromSrc: string): boolean {
  const rel = normalizeSrcRel(relFromSrc)
  return SKIP_VUE_APP_SHELLS.has(rel) || shouldSkipVueRouteShell(product, rel)
}

/** Vue `src/pages/**` → Next `src/views/**` (no Pages Router clash with `src/app/`). */
function viewsRelFromPagesRel(relFromSrc: string): string {
  const normalized = normalizeSrcRel(relFromSrc)
  return normalized.startsWith('pages/') ? normalized.replace(/^pages\//, 'views/') : normalized
}

function writeText(path: string, body: string): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body, 'utf8')
}

function walkFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (SKIP_COPY_NAMES.has(name)) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) walkFiles(full, out)
    else out.push(full)
  }
  return out
}

function copyDirFiltered(src: string, dest: string, skipExt?: Set<string>): void {
  if (!existsSync(src)) return
  mkdirSync(dest, { recursive: true })
  for (const name of readdirSync(src)) {
    if (SKIP_COPY_NAMES.has(name)) continue
    const from = join(src, name)
    const to = join(dest, name)
    const st = statSync(from)
    if (st.isDirectory()) copyDirFiltered(from, to, skipExt)
    else if (!skipExt?.has(name.slice(name.lastIndexOf('.')))) {
      mkdirSync(dirname(to), { recursive: true })
      cpSync(from, to)
    }
  }
}

/** Normalize monorepo imports to tsconfig aliases (`modules/`, `portable/`). */
function rewriteMonorepoImports(root: string): number {
  let n = 0
  for (const file of walkFiles(root)) {
    if (!/\.(scss|sass|css|ts|tsx|js|jsx)$/.test(file)) continue
    const before = readFileSync(file, 'utf8')
    const after = before
      .replace(
        /(@use|@import)\s+(['"])((?:\.\.\/)+)shared_modules\//g,
        (_m, at, quote) => `${at} ${quote}modules/`,
      )
      .replace(
        /(@use|@import)\s+(['"])((?:\.\.\/)+)portable\//g,
        (_m, at, quote) => `${at} ${quote}portable/`,
      )
      .replace(
        /(from\s+['"])((?:\.\.\/)+)shared_modules(\/|['"])/g,
        (_m, pref, end) => `${pref}modules${end}`,
      )
      .replace(
        /(?<!@)import\s+(['"])((?:\.\.\/)+)shared_modules(\/|['"])/g,
        (_m, pref, end) => `${pref}modules${end}`,
      )
      .replace(
        /(from\s+['"])((?:\.\.\/)+)portable(\/|['"])/g,
        (_m, pref, end) => `${pref}portable${end}`,
      )
      .replace(
        /(?<!@)import\s+(['"])((?:\.\.\/)+)portable(\/|['"])/g,
        (_m, pref, end) => `${pref}portable${end}`,
      )
    if (after !== before) {
      writeFileSync(file, after, 'utf8')
      n += 1
    }
  }
  return n
}

function rewriteVueImportPaths(source: string): string {
  return source
    .replace(/from\s+(['"])([^'"]+)\.vue\1/g, (_m, q, path) => `from ${q}${path}${q}`)
    .replace(/\bimport\(\s*(['"])([^'"]+)\.vue\1\s*\)/g, (_m, q, path) => `import(${q}${path}${q})`)
}

function convertVueFileToTsx(vuePath: string, destTsxPath: string): string {
  const source = readFileSync(vuePath, 'utf8')
  const base = emitBaseName(vuePath)

  let body: string
  let name: string
  let stylesCss: string | undefined

  // Always use the SFC-aware converter for product pages (handles <script setup>).
  {
    const converted = convertVueSfcToReact(source, vuePath)
    body = rewriteVueImportPaths(converted.body)
    name = converted.name
    const { descriptor } = parseVueSfc(source, vuePath)
    stylesCss = loadSiblingCssFromVue(vuePath, descriptor.scriptSetup?.content)
  }

  if (stylesCss) {
    writeText(join(dirname(destTsxPath), `${base}.css`), `${stylesCss.trim()}\n`)
  }

  const vueDir = dirname(vuePath)
  const destDir = dirname(destTsxPath)
  if (existsSync(vueDir)) {
    for (const name of readdirSync(vueDir)) {
      if (name.startsWith('_') && name.endsWith('.scss')) {
        writeText(join(destDir, name), readFileSync(join(vueDir, name), 'utf8'))
      }
    }
  }

  writeText(destTsxPath, `'use client'\n\n${body}`)
  return name
}

function convertVueFileToSolid(vuePath: string, destTsxPath: string): string {
  const source = readFileSync(vuePath, 'utf8')
  const base = emitBaseName(vuePath)

  const converted = convertVueSfcToReact(source, vuePath)
  const body = reactTsxToSolidBody(rewriteVueImportPaths(converted.body))
  const name = converted.name
  const { descriptor } = parseVueSfc(source, vuePath)
  const stylesCss = loadSiblingCssFromVue(vuePath, descriptor.scriptSetup?.content)

  if (stylesCss) {
    writeText(join(dirname(destTsxPath), `${base}.css`), `${stylesCss.trim()}\n`)
  }

  const vueDir = dirname(vuePath)
  const destDir = dirname(destTsxPath)
  if (existsSync(vueDir)) {
    for (const fileName of readdirSync(vueDir)) {
      if (fileName.startsWith('_') && fileName.endsWith('.scss')) {
        writeText(join(destDir, fileName), readFileSync(join(vueDir, fileName), 'utf8'))
      }
    }
  }

  writeText(destTsxPath, body)
  return name
}

function parseVueSfc(source: string, filePath: string) {
  return parseSfc(source, { filename: filePath })
}

function loadSiblingCssFromVue(filePath: string, script?: string): string | undefined {
  const cssImport = script?.match(/import\s+['"](\.\/[^'"]+\.css)['"]/)?.[1]
  if (!cssImport) return undefined
  const normalized = cssImport.replace(/^\.\//, '')
  const candidates = [
    join(dirname(filePath), normalized),
    join(dirname(filePath), '../css', normalized),
  ]
  for (const cssPath of candidates) {
    try {
      const raw = readFileSync(cssPath, 'utf8')
      return raw.replace(/^\/\*[\s\S]*?\*\/\s*/gm, '').replace(/\s+/g, ' ').trim()
    } catch {
      // try next
    }
  }
  return undefined
}

function emitVueTreeToReact(
  sourceSrc: string,
  destSrc: string,
  product: NextConvertProduct,
): { converted: string[]; failures: string[]; skipped: string[] } {
  const converted: string[] = []
  const failures: string[] = []
  const skipped: string[] = []

  for (const vuePath of walkFiles(sourceSrc).filter((f) => f.endsWith('.vue'))) {
    const rel = relative(sourceSrc, vuePath)
    if (shouldSkipVueEmit(product, rel)) {
      skipped.push(rel)
      continue
    }
    const destTsxPath = join(destSrc, viewsRelFromPagesRel(rel.replace(/\.vue$/, '.tsx')))
    try {
      convertVueFileToTsx(vuePath, destTsxPath)
      converted.push(`${rel} → ${relative(destSrc, destTsxPath)}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      failures.push(`${rel}: ${msg}`)
    }
  }

  return { converted, failures, skipped }
}

function emitVueTreeToSolid(
  sourceSrc: string,
  destSrc: string,
  product: ConvertProductId,
): { converted: string[]; failures: string[]; skipped: string[] } {
  const converted: string[] = []
  const failures: string[] = []
  const skipped: string[] = []

  for (const vuePath of walkFiles(sourceSrc).filter((f) => f.endsWith('.vue'))) {
    const rel = relative(sourceSrc, vuePath)
    if (shouldSkipVueEmit(product, rel)) {
      skipped.push(rel)
      continue
    }
    const destTsxPath = join(destSrc, viewsRelFromPagesRel(rel.replace(/\.vue$/, '.tsx')))
    try {
      convertVueFileToSolid(vuePath, destTsxPath)
      converted.push(`${rel} → ${relative(destSrc, destTsxPath)}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      failures.push(`${rel}: ${msg}`)
    }
  }

  return { converted, failures, skipped }
}

function purgeNuxtAppShellEmit(destSrc: string): number {
  let n = 0
  for (const rel of ['app.tsx', 'layouts/default.tsx']) {
    const file = join(destSrc, rel)
    if (!existsSync(file)) continue
    unlinkSync(file)
    n += 1
  }
  return n
}

function purgeLegacyPagesRouterEmit(dest: string): number {
  const pagesDir = join(dest, 'src/pages')
  if (!existsSync(pagesDir)) return 0
  let n = 0
  for (const file of walkFiles(pagesDir)) {
    if (!/\.(tsx|ts|vue)$/.test(file)) continue
    unlinkSync(file)
    n += 1
  }
  return n
}

function copyStaticAssets(sourceRoot: string, dest: string, copied: string[]): void {
  const publicSrc = join(sourceRoot, 'public')
  if (existsSync(publicSrc)) {
    copyDirFiltered(publicSrc, join(dest, 'public'))
    copied.push('public → public')
  }

  const assetsSrc = join(sourceRoot, 'src/assets')
  if (existsSync(assetsSrc)) {
    copyDirFiltered(assetsSrc, join(dest, 'src/assets'))
    copied.push('src/assets → src/assets')
  }

  const sourceSrc = join(sourceRoot, 'src')
  if (!existsSync(sourceSrc)) return

  for (const file of walkFiles(sourceSrc)) {
    const rel = relative(sourceSrc, file)
    if (rel.endsWith('.vue')) continue
    if (/^composables\//.test(rel)) continue
    if (/^plugins\//.test(rel)) continue
    if (/^layouts\//.test(rel)) continue
    if (/^server\//.test(rel)) continue
    if (rel === 'app.vue' || rel === 'nucleify.ts' || rel === 'nuc_client.ts') continue
    if (!/\.(scss|sass|css|ts|tsx|js|json|svg|png|jpg|webp)$/.test(file)) continue

    const destPath = join(dest, 'src', viewsRelFromPagesRel(rel))
    mkdirSync(dirname(destPath), { recursive: true })
    cpSync(file, destPath)
    if (/\.(ts|scss|sass)$/.test(file)) {
      copied.push(`src/${rel}`)
    }
  }
}

function scssBundleImport(abs: string, fromDir: string): string {
  let rel = relative(fromDir, abs).replace(/\\/g, '/')
  if (!rel.startsWith('.')) rel = `./${rel}`
  if (rel.endsWith('/_index.scss')) return rel.replace(/\/_index\.scss$/, '/index')
  if (rel === './_index.scss') return './index'
  return rel.replace(/\.scss$/, '')
}

function buildScssBundle(dest: string): number {
  const styleBundle = join(dest, 'src/styles/migrated-product.scss')
  const allPartials = walkFiles(join(dest, 'src')).filter((f) => {
    const p = f.replace(/\\/g, '/')
    if (p.includes('/assets/')) return false
    return /\/_[^/]+\.scss$/.test(p)
  })
  const indexDirs = new Set(
    allPartials.filter((f) => f.replace(/\\/g, '/').endsWith('/_index.scss')).map((f) => dirname(f)),
  )
  const scssPartials = allPartials
    .filter((f) => {
      const p = f.replace(/\\/g, '/')
      if (p.endsWith('/_index.scss')) return true
      return !indexDirs.has(dirname(f))
    })
    .sort()
  const bundleDir = dirname(styleBundle)
  writeText(
    styleBundle,
    [
      '// Generated by convert — product SCSS for Next global CSS pipeline.',
      ...scssPartials.map((abs) => `@import '${scssBundleImport(abs, bundleDir)}';`),
      '',
    ].join('\n'),
  )
  return scssPartials.length
}

function purgeVueFiles(dest: string): number {
  let n = 0
  for (const file of walkFiles(join(dest, 'src'))) {
    if (!file.endsWith('.vue')) continue
    unlinkSync(file)
    n += 1
  }
  return n
}

function writeNextShell(
  dest: string,
  product: NextConvertProduct,
  cfg: NextConvertConfig,
): void {
  writeText(
    join(dest, 'src/lib/nucleify-ui-provider.tsx'),
    product === 'web'
      ? `'use client'

import { useEffect } from 'react'
import { setupNui } from 'portable/nui'

export function NucleifyUiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupNui({ palette: 'next', mode: 'dark' })
    let stopRainbow: (() => void) | undefined
    let cancelled = false
    void import('nui-rainbow').then(({ applyRainbow }) => {
      if (cancelled) return
      stopRainbow = applyRainbow(document.body, {
        cycle: 'linear',
        duration: 30,
        reducedMotion: 'ignore',
      })
    })
    return () => {
      cancelled = true
      stopRainbow?.()
    }
  }, [])

  return (
    <>
      <nui-toast position="top-right" />
      {children}
    </>
  )
}
`
      : `'use client'

import { useEffect } from 'react'
import { setupNui } from 'portable/nui'

export function NucleifyUiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupNui({ palette: 'next', mode: 'dark' })
  }, [])

  return (
    <>
      <nui-toast position="top-right" />
      {children}
    </>
  )
}
`,
  )

  writeText(
    join(dest, 'src/app/layout.tsx'),
    `import { NucleifyUiProvider } from '@/lib/nucleify-ui-provider'
import type { Metadata } from 'next'
import 'nui-rainbow/styles.css'
import 'portable/nui/fonts.css'
import '@/styles/migrated-product.scss'

export const metadata: Metadata = {
  title: '${cfg.title}',
  description: '${cfg.description}',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="nuc-next p-dark" suppressHydrationWarning>
      <body
        className="nuc-next p-dark nui-rainbow"
        {...{ 'reduced-motion': 'ignore' }}
        style={{ margin: 0, background: '${cfg.shellBg}', color: '${cfg.shellFg}' }}
        suppressHydrationWarning
      >
        <NucleifyUiProvider>{children}</NucleifyUiProvider>
      </body>
    </html>
  )
}
`,
  )

  const entryImport = cfg.entryModule
  if (product === 'web') {
    writeText(
      join(dest, 'src/lib/locales.ts'),
      `export const WEB_LOCALES = ${JSON.stringify(WEB_LOCALES)} as const
export type WebLocale = (typeof WEB_LOCALES)[number]
export const WEB_LOCALE_SET = new Set<string>(WEB_LOCALES)

export function isWebLocale(value: string): value is WebLocale {
  return WEB_LOCALE_SET.has(value)
}
`,
    )
    writeText(
      join(dest, 'src/app/[lang]/home/page.tsx'),
      `import Page from '${entryImport}'
import { isWebLocale } from '@/lib/locales'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ lang: string }> }

export function generateStaticParams() {
  return ${JSON.stringify(WEB_LOCALES.map((lang) => ({ lang })))}
}

export default async function HomeRoute({ params }: Props) {
  const { lang } = await params
  if (!isWebLocale(lang)) notFound()
  return <Page />
}
`,
    )
    writeText(
      join(dest, 'src/app/[lang]/investor/page.tsx'),
      `import Page from '@/views/investor/index'
import { isWebLocale } from '@/lib/locales'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ lang: string }> }

export function generateStaticParams() {
  return ${JSON.stringify(WEB_LOCALES.map((lang) => ({ lang })))}
}

export default async function InvestorRoute({ params }: Props) {
  const { lang } = await params
  if (!isWebLocale(lang)) notFound()
  return <Page />
}
`,
    )
    writeText(
      join(dest, 'src/app/[lang]/page.tsx'),
      `import { isWebLocale } from '@/lib/locales'
import { notFound, redirect } from 'next/navigation'

type Props = { params: Promise<{ lang: string }> }

export function generateStaticParams() {
  return ${JSON.stringify(WEB_LOCALES.map((lang) => ({ lang })))}
}

export default async function LangIndexRoute({ params }: Props) {
  const { lang } = await params
  if (!isWebLocale(lang)) notFound()
  redirect(\`/\${lang}/home\`)
}
`,
    )
    writeText(
      join(dest, 'src/app/page.tsx'),
      `import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('${cfg.redirectRoot}')
}
`,
    )
  } else {
    writeText(
      join(dest, 'src/app/page.tsx'),
      `import Page from '${entryImport}'

export default function AdminRoute() {
  return <Page />
}
`,
    )
  }

  writeText(
    join(dest, 'next.config.ts'),
    `import { existsSync } from 'node:fs'
import type { NextConfig } from 'next'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const monorepo = join(here, '..')
const litRoot = join(monorepo, 'node_modules/lit')
const litReactive = join(monorepo, 'node_modules/@lit/reactive-element')
const assetsScss = join(here, 'src/assets/_index.scss').replace(/\\\\/g, '/')

function scssAdditionalData(
  content: string,
  loaderContext: { resourcePath: string },
): string {
  const p = loaderContext.resourcePath.replace(/\\\\/g, '/')
  if (p.includes('/node_modules/') || p.endsWith('.css')) {
    return content
  }
  if (p.includes('/assets/_index.scss') || p.includes('/assets/index.scss')) {
    return content
  }
  if (!existsSync(assetsScss)) return content
  return \`@import \${JSON.stringify(assetsScss)};\\n\${content}\`
}

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  transpilePackages: ['nucleify-ui'],
  async redirects() {
    return [
      { source: '/home', destination: '/en/home', permanent: true },
      { source: '/home/:path*', destination: '/en/home', permanent: true },
      { source: '/investor', destination: '/en/investor', permanent: true },
      { source: '/investor/:path*', destination: '/en/investor', permanent: true },
    ]
  },
  sassOptions: {
    includePaths: [join(monorepo, 'shared_modules'), join(monorepo, 'portable'), join(here, 'src')],
    silenceDeprecations: ['mixed-decls', 'import', 'color-functions', 'global-builtin', 'legacy-js-api'],
    quietDeps: true,
    additionalData: scssAdditionalData,
  },
  turbopack: {
    resolveAlias: {
      modules: join(monorepo, 'shared_modules'),
      portable: join(monorepo, 'portable'),
      lit: litRoot,
      '@lit/reactive-element': litReactive,
    },
  },
  webpack: (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      modules: join(monorepo, 'shared_modules'),
      portable: join(monorepo, 'portable'),
      lit: litRoot,
      '@lit/reactive-element': litReactive,
    }
    return config
  },
}

export default nextConfig
`,
  )
}

function writeSolidShell(dest: string, product: ConvertProductId, cfg: ConvertConfig): void {
  const src = join(dest, 'src')

  writeText(
    join(src, 'lib/react-compat.ts'),
    `/** React-shaped ref that is also a Solid \`ref={fn}\` callback. */
export type SolidCompatRef<T> = ((el: T) => void) & { current: T }

export function useRef<T>(initial: T): SolidCompatRef<T> {
  const ref = ((el: T) => {
    ref.current = el
  }) as SolidCompatRef<T>
  ref.current = initial
  return ref
}
`,
  )

  writeText(
    join(src, 'lib/vue-reactivity-shim.ts'),
    `import { createSignal } from 'solid-js'

/** Minimal \`reactive()\` for migrated Vue setup scripts (Solid product convert). */
export function useReactive<T extends Record<string, unknown>>(initial: T): T {
  const [get, set] = createSignal({ ...initial } as T, { equals: false })
  return new Proxy({} as T, {
    get(_target, prop: string | symbol) {
      return get()[prop as keyof T]
    },
    set(_target, prop: string | symbol, value) {
      set({ ...get(), [prop]: value } as T)
      return true
    },
    deleteProperty(_target, prop: string | symbol) {
      const next = { ...get() }
      delete next[prop as keyof T]
      set(next)
      return true
    },
  })
}

/** @deprecated use useReactive — kept for import compatibility */
export const reactive = useReactive
`,
  )

  writeText(
    join(src, 'lib/nucleify-ui-provider.tsx'),
    product === 'web'
      ? `import { onMount, type JSX } from 'solid-js'
import { setupNui } from 'portable/nui'

export function NucleifyUiProvider(props: { children: JSX.Element }) {
  onMount(() => {
    setupNui({ palette: 'next', mode: 'dark' })
    void import('nui-rainbow').then(({ applyRainbow }) => {
      applyRainbow(document.body, {
        cycle: 'linear',
        duration: 30,
        reducedMotion: 'ignore',
      })
    })
  })
  return (
    <>
      {props.children}
      <nui-toast position="top-right" />
    </>
  )
}
`
      : `import { onMount, type JSX } from 'solid-js'
import { setupNui } from 'portable/nui'

export function NucleifyUiProvider(props: { children: JSX.Element }) {
  onMount(() => {
    setupNui({ palette: 'next', mode: 'dark' })
  })
  return (
    <>
      {props.children}
      <nui-toast position="top-right" />
    </>
  )
}
`,
  )

  if (product === 'web') {
    writeText(
      join(src, 'lib/locales.ts'),
      `export const WEB_LOCALES = ${JSON.stringify(WEB_LOCALES)} as const
export type WebLocale = (typeof WEB_LOCALES)[number]
export const WEB_LOCALE_SET = new Set<string>(WEB_LOCALES)

export function isWebLocale(value: string): value is WebLocale {
  return WEB_LOCALE_SET.has(value)
}
`,
    )
  }

  writeText(
    join(src, 'App.tsx'),
    product === 'web'
      ? `import { Navigate, Route, Router } from '@solidjs/router'
import { NucleifyUiProvider } from '@/lib/nucleify-ui-provider'
import { isWebLocale } from '@/lib/locales'
import Home from '${cfg.entryModule}'
import Investor from '@/views/investor/index'

function LangGate(props: { params: { lang: string }; children: any }) {
  if (!isWebLocale(props.params.lang)) return <Navigate href="${cfg.redirectRoot}" />
  return props.children
}

export default function App() {
  return (
    <NucleifyUiProvider>
      <Router>
        <Route path="/" component={() => <Navigate href="${cfg.redirectRoot}" />} />
        <Route path="/:lang" component={(p) => <Navigate href={\`/\${p.params.lang}/home\`} />} />
        <Route
          path="/:lang/home"
          component={(p) => (
            <LangGate params={p.params}>
              <Home />
            </LangGate>
          )}
        />
        <Route
          path="/:lang/investor"
          component={(p) => (
            <LangGate params={p.params}>
              <Investor />
            </LangGate>
          )}
        />
      </Router>
    </NucleifyUiProvider>
  )
}
`
      : `import { Route, Router } from '@solidjs/router'
import { NucleifyUiProvider } from '@/lib/nucleify-ui-provider'
import Page from '${cfg.entryModule}'

export default function App() {
  return (
    <NucleifyUiProvider>
      <Router>
        <Route path="*" component={Page} />
      </Router>
    </NucleifyUiProvider>
  )
}
`,
  )

  writeText(
    join(src, 'main.tsx'),
    `import { render } from 'solid-js/web'
import App from './App'
import 'portable/nui/fonts.css'
${product === 'web' ? "import 'nui-rainbow/styles.css'\n" : ''}import '@/styles/migrated-product.scss'

document.body.style.margin = '0'
document.body.style.background = '${cfg.shellBg}'
document.body.style.color = '${cfg.shellFg}'
document.body.classList.add('nuc-solid', 'p-dark', 'nui-rainbow')

render(() => <App />, document.getElementById('root')!)
`,
  )

  writeText(
    join(dest, 'vite.config.ts'),
    `import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const monorepo = join(here, '..')
const assetsScss = join(here, 'src/assets/_index.scss').replace(/\\\\/g, '/')

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
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          join(monorepo, 'shared_modules'),
          join(monorepo, 'portable'),
          join(here, 'src'),
        ],
        additionalData: (content: string, fp: string) => {
          const p = fp.replace(/\\\\/g, '/')
          if (p.includes('/node_modules/') || p.endsWith('.css')) return content
          if (p.includes('/assets/_index.scss')) return content
          if (!existsSync(assetsScss)) return content
          return \`@import \${JSON.stringify(assetsScss)};\\n\${content}\`
        },
      },
    },
  },
})
`,
  )
}

/**
 * Tryb B: scaffold Next or Solid product shell and emit TSX from Nuxt Vue SFCs.
 * Output must contain **no** `.vue` files.
 */
export function convertProduct(opts: {
  product: ProductId
  framework: ScaffoldFramework
  cwd?: string
  force?: boolean
}): { dest: string; copied: string[] } {
  const cwd = resolve(opts.cwd ?? process.cwd())
  const { product, framework, force } = opts

  if (!PRODUCT_IDS.includes(product)) {
    throw new Error(`convert: unknown product "${product}"`)
  }
  if (!SCAFFOLD_FRAMEWORKS.includes(framework)) {
    throw new Error(`convert: unknown framework "${framework}"`)
  }
  const isNext = framework === 'next'
  const isSolid = framework === 'solid'
  if ((!isNext && !isSolid) || !CONVERT_PRODUCTS.includes(product as ConvertProductId)) {
    throw new Error(
      `convert: only ${CONVERT_PRODUCTS.join('|')}→next|solid is implemented (got ${product}→${framework})`,
    )
  }

  const cfg = isSolid
    ? SOLID_CONVERT[product as ConvertProductId]
    : NEXT_CONVERT[product as ConvertProductId]
  const sourceRoot = join(cwd, product)
  if (!existsSync(sourceRoot)) {
    throw new Error(`convert: missing source product at ${product}/`)
  }

  const dest = productShellPath(product, framework, cwd)
  const copied: string[] = []

  scaffoldProduct({
    product,
    framework,
    cwd,
    force: Boolean(force || !existsSync(join(dest, 'package.json'))),
  })

  const sourceSrc = join(sourceRoot, 'src')
  const destSrc = join(dest, 'src')

  copyStaticAssets(sourceRoot, dest, copied)

  const assetsScss = join(destSrc, 'assets/_index.scss')
  if (!existsSync(assetsScss)) {
    writeText(assetsScss, `@import '../../../portable/nui/tokens';\n`)
    copied.push('src/assets/_index.scss (minimal stub)')
  }

  const tree = isSolid
    ? emitVueTreeToSolid(sourceSrc, destSrc, product as ConvertProductId)
    : emitVueTreeToReact(sourceSrc, destSrc, product as ConvertProductId)
  const { converted, failures, skipped } = tree
  copied.push(...converted.map((c) => `${isSolid ? 'vue→solid' : 'vue→tsx'} ${c}`))
  if (skipped.length) {
    copied.push(`skipped ${skipped.length} Nuxt route shell(s): ${skipped.join(', ')}`)
  }

  if (isNext) {
    const purgedPages = purgeLegacyPagesRouterEmit(dest)
    if (purgedPages) copied.push(`removed ${purgedPages} legacy src/pages emit file(s)`)

    const purgedAppShell = purgeNuxtAppShellEmit(destSrc)
    if (purgedAppShell) copied.push(`removed ${purgedAppShell} Nuxt app shell emit file(s)`)
  }

  if (failures.length) {
    throw new Error(
      `convert: ${failures.length} Vue file(s) could not be emitted — extend compiler parser/emit or simplify source:\n${failures.map((f) => `  - ${f}`).join('\n')}`,
    )
  }

  const purged = purgeVueFiles(dest)
  if (purged) copied.push(`removed ${purged} stray .vue file(s)`)

  const scssCount = buildScssBundle(dest)
  copied.push(`bundled ${scssCount} scss partial(s) into migrated-product.scss`)

  writeText(
    join(destSrc, 'nucleify.ts'),
    `/** ${isSolid ? 'Solid' : 'Next'} host barrel — landing imports only (no full nuc_api type surface). */
export { flashToast, closeToast, setToastInstance } from 'modules/nuc_api/utils/use_toast'
`,
  )
  copied.push(`src/nucleify.ts (${isSolid ? 'solid' : 'next'}-safe barrel)`)

  const bumped = rewriteMonorepoImports(dest)
  if (bumped) copied.push(`rewrote monorepo imports in ${bumped} file(s)`)

  if (isSolid) {
    writeSolidShell(dest, product as ConvertProductId, cfg)
  } else {
    writeNextShell(dest, product as ConvertProductId, cfg)
  }

  const tsconfigPath = join(dest, 'tsconfig.json')
  if (existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8')) as {
      compilerOptions?: { paths?: Record<string, string[]>; jsxImportSource?: string }
    }
    tsconfig.compilerOptions = tsconfig.compilerOptions || {}
    tsconfig.compilerOptions.paths = {
      '@/*': ['./src/*'],
      modules: ['../shared_modules'],
      'modules/*': ['../shared_modules/*'],
      portable: ['../portable'],
      'portable/*': ['../portable/*'],
      'portable/nui': ['../portable/nui'],
      'portable/nui/*': ['../portable/nui/*'],
      nucleify: ['./src/nucleify.ts'],
    }
    if (isSolid) tsconfig.compilerOptions.jsxImportSource = 'solid-js'
    writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`, 'utf8')
  }

  const pkgPath = join(dest, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
    name: string
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
  pkg.name = cfg.packageName
  pkg.dependencies = {
    ...pkg.dependencies,
    '@supabase/supabase-js': '^2.105.1',
    ...cfg.extraDeps,
  }
  pkg.devDependencies = {
    ...pkg.devDependencies,
    sass: '1.89.0',
  }
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')

  const envExample = join(sourceRoot, '.config/.env.example')
  if (existsSync(envExample)) {
    cpSync(envExample, join(dest, '.env.example'))
    copied.push('.config/.env.example → .env.example')
  }

  writeText(
    join(dest, 'MIGRATION.md'),
    [
      `# ${product}-${framework} — Vue SFC → ${isSolid ? 'Solid' : 'React'} TSX`,
      '',
      `\`pnpm compiler -- convert ${product} --target=${framework}\``,
      '',
      `- **Source of truth:** top-level \`${product}/\` (Nuxt/Vue)`,
      `- **Host:** ${isSolid ? 'Vite + Solid + @solidjs/router' : 'Next App Router with native React'}`,
      '',
      '```bash',
      `make ${product} TARGET=${framework}`,
      `pnpm compiler -- convert ${product} --target=${framework} --force`,
      '```',
      '',
      'Copied / converted:',
      ...copied.map((c) => `- ${c}`),
      '',
    ].join('\n'),
  )

  return { dest, copied }
}

export function describeConvert(cwd: string, dest: string): string {
  return toRepoRelative(cwd, dest)
}
