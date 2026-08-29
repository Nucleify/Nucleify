import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import {
  PRODUCT_IDS,
  SCAFFOLD_FRAMEWORKS,
  scaffoldProduct,
  type ProductId,
  type ScaffoldFramework,
} from './scaffold'
import { toRepoRelative } from './discover'

const SKIP_COPY_NAMES = new Set([
  'node_modules',
  '.nuxt',
  '.output',
  '.git',
  'dist',
  '.turbo',
])

function copyDirFiltered(src: string, dest: string): void {
  if (!existsSync(src)) return
  mkdirSync(dest, { recursive: true })
  for (const name of readdirSync(src)) {
    if (SKIP_COPY_NAMES.has(name)) continue
    const from = join(src, name)
    const to = join(dest, name)
    const st = statSync(from)
    if (st.isDirectory()) copyDirFiltered(from, to)
    else {
      mkdirSync(dirname(to), { recursive: true })
      cpSync(from, to)
    }
  }
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

/** `web/src/...` is 3 levels to repo root; `next/web/src/...` needs 4. */
function bumpSharedModulesImports(root: string): number {
  let n = 0
  for (const file of walkFiles(root)) {
    if (!/\.(scss|sass|vue|css|ts|tsx|js|jsx)$/.test(file)) continue
    const before = readFileSync(file, 'utf8')
    const after = before
      .replace(
        /(@use|@import)\s+(['"])((?:\.\.\/)+)shared_modules\//g,
        (_m, at, quote, ups) => `${at} ${quote}../${ups}shared_modules/`,
      )
      .replace(
        /(@use|@import)\s+(['"])((?:\.\.\/)+)portable\//g,
        (_m, at, quote, ups) => `${at} ${quote}../${ups}portable/`,
      )
      .replace(
        /(from\s+['"])((?:\.\.\/)+)shared_modules(\/|['"])/g,
        (_m, pref, ups, end) => `${pref}../${ups}shared_modules${end}`,
      )
      // JS side-effect import — do not match SCSS `@import`.
      .replace(
        /(?<!@)import\s+(['"])((?:\.\.\/)+)shared_modules(\/|['"])/g,
        (_m, pref, ups, end) => `${pref}../${ups}shared_modules${end}`,
      )
      .replace(
        /(from\s+['"])((?:\.\.\/)+)portable(\/|['"])/g,
        (_m, pref, ups, end) => `${pref}../${ups}portable${end}`,
      )
      .replace(
        /(?<!@)import\s+(['"])((?:\.\.\/)+)portable(\/|['"])/g,
        (_m, pref, ups, end) => `${pref}../${ups}portable${end}`,
      )
    if (after !== before) {
      writeFileSync(file, after, 'utf8')
      n += 1
    }
  }
  return n
}

/**
 * Merge Next product template + full copy of Nuxt `web/` sources into `next/web`.
 * Vue SFCs run via vue-loader inside the Next webpack pipeline (migration host).
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
  if (framework !== 'next' || product !== 'web') {
    throw new Error(
      `convert: only web→next is implemented (got ${product}→${framework})`,
    )
  }

  const sourceRoot = join(cwd, product)
  if (!existsSync(sourceRoot)) {
    throw new Error(`convert: missing source product at ${product}/`)
  }

  const dest = join(cwd, framework, product)
  const copied: string[] = []

  if (!existsSync(join(dest, 'package.json')) || force) {
    scaffoldProduct({
      product,
      framework,
      cwd,
      force: Boolean(force || !existsSync(dest)),
    })
  } else {
    scaffoldProduct({ product, framework, cwd, force: false })
  }

  const transfers: [string, string][] = [
    ['public', 'public'],
    ['src/pages', 'src/pages'],
    ['src/assets', 'src/assets'],
    ['src/composables', 'src/composables'],
    ['src/plugins', 'src/plugins'],
    ['src/layouts', 'src/layouts'],
    ['src/server', 'src/server'],
    ['src/components', 'src/components'],
  ]

  for (const [fromRel, toRel] of transfers) {
    const from = join(sourceRoot, fromRel)
    if (!existsSync(from)) continue
    copyDirFiltered(from, join(dest, toRel))
    copied.push(`${fromRel} → ${toRel}`)
  }

  for (const file of ['src/nuc_client.ts', 'src/nucleify.ts', 'src/app.vue']) {
    const from = join(sourceRoot, file)
    if (!existsSync(from)) continue
    mkdirSync(dirname(join(dest, file)), { recursive: true })
    cpSync(from, join(dest, file))
    copied.push(file)
  }

  const bumped = bumpSharedModulesImports(dest)
  if (bumped) copied.push(`rewrote shared_modules imports in ${bumped} file(s)`)

  // After path bump — avoid `export *` of Nuxt-bound modules (languages/dark_mode).
  writeText(
    join(dest, 'src/nucleify.ts'),
    `/** Next host barrel — API/globals/stores/colors only (no Nuxt app runtime). */
export * from '../../../shared_modules/nuc_api'
export * from '../../../shared_modules/nuc_colors'
export * from '../../../shared_modules/nuc_globals'
export * from '../../../shared_modules/nuc_stores'
`,
  )
  copied.push('src/nucleify.ts (next-safe barrel)')
  const homePage = join(dest, 'src/pages/home/index.vue')
  if (existsSync(homePage)) {
    let src = readFileSync(homePage, 'utf8')
    src = src.replace(
      /import\s+\{\s*useRoute\s*\}\s+from\s+['"]nuxt\/app['"]/,
      "import { useRoute } from '@/shims/nuxt-app'",
    )
    writeFileSync(homePage, src, 'utf8')
  }

  let sassIndexRewrites = 0
  for (const file of walkFiles(join(dest, 'src'))) {
    if (!/\.(ts|tsx|vue|js|scss|sass)$/.test(file)) continue
    const before = readFileSync(file, 'utf8')
    let after = before
      .replace(/from\s+['"]nuxt\/app['"]/g, "from '@/shims/nuxt-app'")
      .replace(/from\s+['"]nitropack\/runtime['"]/g, "from '@/shims/nuxt-app'")
    // Vite/Nuxt resolve bare `@import 'index'` next to the SFC; webpack sass needs `./`.
    const withRelativeIndex = after.replace(
      /@import\s+(['"])index\1/g,
      "@import './index'",
    )
    if (withRelativeIndex !== after) {
      after = withRelativeIndex
      sassIndexRewrites += 1
    }
    if (after !== before) writeFileSync(file, after, 'utf8')
  }
  if (sassIndexRewrites) {
    copied.push(`rewrote @import 'index' → './index' in ${sassIndexRewrites} file(s)`)
  }

  // Next's CSS pipeline cannot host Vue SFC <style>; hoist sibling _index.scss into one bundle.
  const styleBundle = join(dest, 'src/styles/migrated-product.scss')
  const scssPartials = walkFiles(join(dest, 'src')).filter(
    (f) =>
      f.replace(/\\/g, '/').endsWith('/_index.scss') &&
      !f.replace(/\\/g, '/').includes('/assets/'),
  )
  scssPartials.sort()
  writeText(
    styleBundle,
    [
      '// Generated by convert — styles hoisted from Vue SFCs for Next CSS pipeline.',
      ...scssPartials.map((abs) => {
        let rel = relative(dirname(styleBundle), abs).replace(/\\/g, '/')
        if (!rel.startsWith('.')) rel = `./${rel}`
        const asIndex = rel
          .replace(/\/_index\.scss$/, '/index')
          .replace(/^\.\/_index\.scss$/, './index')
          .replace(/\.scss$/, '')
        return `@import '${asIndex}';`
      }),
      '',
    ].join('\n'),
  )
  let strippedStyles = 0
  for (const file of walkFiles(join(dest, 'src'))) {
    if (!file.endsWith('.vue')) continue
    const before = readFileSync(file, 'utf8')
    const after = before.replace(/<style\b[^>]*>[\s\S]*?<\/style>\s*/gi, '')
    if (after !== before) {
      writeFileSync(file, after, 'utf8')
      strippedStyles += 1
    }
  }
  copied.push(
    `hoisted ${scssPartials.length} scss partial(s), stripped <style> from ${strippedStyles} vue file(s)`,
  )

  writeText(
    join(dest, 'src/shims/nuxt-app.ts'),
    `/** Shims so migrated Vue/TS + shared_modules compile without Nuxt/Nitro. */
'use client'

import { ref, type Ref } from 'vue'

export function useRoute() {
  if (typeof window === 'undefined') {
    return { params: { lang: 'en' } as Record<string, string>, path: '/en/home', query: {} as Record<string, string> }
  }
  const parts = window.location.pathname.split('/').filter(Boolean)
  const lang = parts[0] || 'en'
  return {
    params: { lang },
    path: window.location.pathname,
    query: Object.fromEntries(new URLSearchParams(window.location.search)),
  }
}

export function useRuntimeConfig() {
  return {
    public: {
      appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY || '',
      appEnv: process.env.NEXT_PUBLIC_APP_ENV || 'local',
    },
  }
}

export function defineNuxtPlugin(plugin: unknown) {
  return plugin
}

export function defineNuxtRouteMiddleware(mw: unknown) {
  return mw
}

export function addRouteMiddleware(_name: string, _mw?: unknown) {
  /* no-op outside Nuxt */
}

export function useNuxtApp(): NuxtApp {
  return {
    _route: useRoute(),
    $i18n: { locale: { value: 'en' } },
  } as NuxtApp
}

const stateBag = new Map<string, Ref<unknown>>()
export function useState<T>(key: string, init?: () => T): Ref<T> {
  if (!stateBag.has(key)) {
    stateBag.set(key, ref(init ? init() : (undefined as T)) as Ref<unknown>)
  }
  return stateBag.get(key) as Ref<T>
}

export function useCookie<T>(
  _name: string,
  opts?: { default?: () => T },
): { value: T | undefined } {
  let current = opts?.default?.()
  return {
    get value() {
      return current
    },
    set value(v: T | undefined) {
      current = v
    },
  }
}

export function useHead(_meta: unknown) {
  /* no-op — Next owns document head */
}

export function useRequestEvent() {
  return undefined
}

export type NuxtApp = Record<string, unknown> & {
  _route?: ReturnType<typeof useRoute>
  $i18n?: { locale: { value: string } }
}
`,
  )

  writeText(
    join(dest, 'src/shims/nuxt-build-config.ts'),
    `/** Stub for Nuxt \`#build/nuxt.config.mjs\` imports. */
export const clientNodePlaceholder = false
export default {}
`,
  )

  writeText(
    join(dest, 'src/lib/vue-home-root.client.tsx'),
    `'use client'

import { useEffect, useRef } from 'react'
import { createApp, type App } from 'vue'
import HomePage from '@/pages/home/index.vue'

export function VueHomeRoot() {
  const host = useRef<HTMLDivElement>(null)
  const appRef = useRef<App | null>(null)

  useEffect(() => {
    if (!host.current || appRef.current) return
    const app = createApp(HomePage)
    app.mount(host.current)
    appRef.current = app
    return () => {
      appRef.current?.unmount()
      appRef.current = null
    }
  }, [])

  return <div ref={host} className="nuc-next-vue-host" style={{ minHeight: '100vh' }} />
}
`,
  )

  writeText(
    join(dest, 'src/app/[lang]/home/page.tsx'),
    `import { VueHomeRoot } from '@/lib/vue-home-root.client'

type Props = { params: Promise<{ lang: string }> }

export default async function HomePage(_props: Props) {
  return <VueHomeRoot />
}
`,
  )

  writeText(
    join(dest, 'src/app/page.tsx'),
    `import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en/home')
}
`,
  )

  writeText(
    join(dest, 'src/lib/nucleify-ui-provider.tsx'),
    `'use client'

import { useEffect } from 'react'
import { setupNui } from 'portable/nui'

/** Only after mount — module-level setupNui reorders html/body classes and breaks hydration. */
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
import 'portable/nui/fonts.css'
import '@/styles/migrated-product.scss'

export const metadata: Metadata = {
  title: 'Nucleify',
  description: 'Nucleify web (Next host + migrated Vue product)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="nuc-next p-dark" suppressHydrationWarning>
      <body
        className="nuc-next p-dark"
        style={{ margin: 0, background: '#070908', color: '#e7ebe8' }}
        suppressHydrationWarning
      >
        <NucleifyUiProvider>{children}</NucleifyUiProvider>
      </body>
    </html>
  )
}
`,
  )

  writeText(
    join(dest, 'next.config.ts'),
    `import type { NextConfig } from 'next'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const here = dirname(fileURLToPath(import.meta.url))
const monorepo = join(here, '../..')
const assetsScss = join(here, 'src/assets/_index.scss').replace(/\\\\/g, '/')

type WebpackUse = string | { loader?: string; options?: unknown }
type WebpackRule = {
  oneOf?: WebpackRule[]
  rules?: WebpackRule[]
  use?: WebpackUse | WebpackUse[]
  test?: unknown
}

/** Same as Nuxt \`additionalData: @import "~/assets/index"\` — skip self-import. */
function scssAdditionalData(
  content: string,
  loaderContext: { resourcePath: string },
): string {
  const p = loaderContext.resourcePath.replace(/\\\\/g, '/')
  if (p.includes('/assets/_index.scss') || p.includes('/assets/index.scss')) {
    return content
  }
  return \`@import \${JSON.stringify(assetsScss)};\\n\${content}\`
}

/** next-swc treats \`.vue?type=script|template\` as JS and chokes on TS/render output. */
function replaceNextSwcForVueScripts(rules: WebpackRule[]): void {
  const probes = [
    '?vue&type=script&lang=ts&setup=true',
    '?vue&type=script&lang=js',
    '?vue&type=template&ts=true',
    '?vue&type=template',
    '?vue&lang=ts',
  ]
  for (const rule of rules) {
    if (Array.isArray(rule.oneOf)) replaceNextSwcForVueScripts(rule.oneOf)
    if (Array.isArray(rule.rules)) replaceNextSwcForVueScripts(rule.rules)
    if (!rule.use) continue

    // vue-loader cloneRule() stamps resource + resourceQuery functions.
    const resource = (rule as { resource?: (r: string) => boolean }).resource
    const resourceQuery = (rule as { resourceQuery?: (q: string) => boolean }).resourceQuery
    if (typeof resource !== 'function' || typeof resourceQuery !== 'function') continue
    let isVueBlock = false
    try {
      resource('/tmp/foo.vue')
      isVueBlock = probes.some((q) => Boolean(resourceQuery(q)))
    } catch {
      continue
    }
    if (!isVueBlock) continue

    const uses = Array.isArray(rule.use) ? rule.use : [rule.use]
    let changed = false
    for (let i = 0; i < uses.length; i++) {
      const u = uses[i]
      const loader = typeof u === 'string' ? u : u?.loader
      if (typeof loader !== 'string' || !loader.includes('next-swc-loader')) continue
      uses[i] = {
        loader: require.resolve('esbuild-loader'),
        options: { loader: 'tsx', target: 'es2020' },
      }
      changed = true
    }
    if (changed) rule.use = Array.isArray(rule.use) ? uses : uses[0]
  }
}

const sassIncludePaths = [
  join(monorepo, 'shared_modules'),
  join(monorepo, 'portable'),
  join(here, 'src'),
]

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  transpilePackages: ['nucleify-ui'],
  outputFileTracingRoot: here,
  sassOptions: {
    includePaths: sassIncludePaths,
    silenceDeprecations: ['mixed-decls', 'import', 'color-functions', 'global-builtin'],
    additionalData: scssAdditionalData,
  },
  webpack: (config) => {
    config.resolve.extensions = ['.vue', ...(config.resolve.extensions || [])]

    // VueLoaderPlugin picks the *first* root rule that matches foo.vue.
    // Next's catch-all \`oneOf\` matches everything — unshift so our rule wins.
    config.module.rules.unshift({
      test: /\\.vue$/,
      use: [
        {
          loader: require.resolve('vue-loader'),
          options: {
            compilerOptions: {
              isCustomElement: (tag: string) => tag.startsWith('nui-'),
            },
          },
        },
      ],
    })

    const { VueLoaderPlugin } = require('vue-loader')
    config.plugins.push(new VueLoaderPlugin())
    config.plugins.push({
      apply(compiler: { options: { module: { rules: WebpackRule[] } } }) {
        replaceNextSwcForVueScripts(compiler.options.module.rules)
      },
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(here, 'src'),
      // Exact \`vue\` only — do not break \`vue/server-renderer\` subpath.
      vue$: 'vue/dist/vue.esm-bundler.js',
      modules: join(monorepo, 'shared_modules'),
      'portable/nui': join(monorepo, 'portable/nui'),
      nucleify: join(here, 'src/nucleify.ts'),
      '~': join(here, 'src'),
      'nuxt/app': join(here, 'src/shims/nuxt-app.ts'),
      '#app': join(here, 'src/shims/nuxt-app.ts'),
      '#build/nuxt.config.mjs': join(here, 'src/shims/nuxt-build-config.ts'),
    }
    return config
  },
}

export default nextConfig
`,
  )

  const tsconfigPath = join(dest, 'tsconfig.json')
  if (existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8')) as {
      compilerOptions?: { paths?: Record<string, string[]> }
    }
    tsconfig.compilerOptions = tsconfig.compilerOptions || {}
    tsconfig.compilerOptions.paths = {
      '@/*': ['./src/*'],
      modules: ['../../shared_modules'],
      'portable/nui': ['../../portable/nui'],
      'portable/nui/*': ['../../portable/nui/*'],
      nucleify: ['./src/nucleify.ts'],
    }
    writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`, 'utf8')
  }

  const pkgPath = join(dest, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
    name: string
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
  pkg.dependencies = {
    ...pkg.dependencies,
    vue: '^3.5.39',
    'vue-router': '^4.5.0',
    animejs: '^4.5.0',
    '@supabase/supabase-js': '^2.105.1',
  }
  pkg.devDependencies = {
    ...pkg.devDependencies,
    'vue-loader': '^17.4.2',
    'esbuild-loader': '^4.3.0',
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
      '# next/web — full product migrate',
      '',
      'Generated by `pnpm compiler -- convert web --target=next`.',
      '',
      '- **Source of truth:** top-level `web/` (Nuxt)',
      '- **Host:** Next App Router + vue-loader',
      '- **UI:** copied Vue SFCs/SCSS/utils/assets/public from `web/`, mounted via `VueHomeRoot`',
      '',
      '```bash',
      'make web TARGET=next',
      'pnpm compiler -- convert web --target=next --force',
      '```',
      '',
      'Copied:',
      ...copied.map((c) => `- ${c}`),
      '',
    ].join('\n'),
  )

  return { dest, copied }
}

export function describeConvert(cwd: string, dest: string): string {
  return toRepoRelative(cwd, dest)
}
