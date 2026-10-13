import { cpSync, existsSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
export const SCAFFOLD_FRAMEWORKS = ['vue', 'react', 'nuxt', 'next', 'solid', 'svelte'] as const
export type ScaffoldFramework = (typeof SCAFFOLD_FRAMEWORKS)[number]

/** @deprecated use SCAFFOLD_FRAMEWORKS */
export const SCAFFOLD_APPS = SCAFFOLD_FRAMEWORKS
/** @deprecated use ScaffoldFramework */
export type ScaffoldApp = ScaffoldFramework

export const PRODUCT_IDS = ['web', 'admin', 'docs'] as const
export type ProductId = (typeof PRODUCT_IDS)[number]

/** Flat product shell dir at repo root, e.g. `web-next`, `admin-next`. */
export function productShellSlug(product: ProductId, framework: ScaffoldFramework): string {
  return `${product}-${framework}`
}

function templatesRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), '../../templates')
}

/**
 * Wipe and recreate a throwaway demo app at `{framework}/demo`
 * from `compiler/templates/{framework}/demo`.
 */
export function scaffoldDemo(framework: ScaffoldFramework, cwd = process.cwd()): string {
  if (!SCAFFOLD_FRAMEWORKS.includes(framework)) {
    throw new Error(
      `unknown framework "${framework}"; expected one of ${SCAFFOLD_FRAMEWORKS.join(', ')}`,
    )
  }
  const src = join(templatesRoot(), framework, 'demo')
  if (!existsSync(src)) {
    throw new Error(`missing demo template: ${src}`)
  }
  const dest = resolve(cwd, framework, 'demo')
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest, { recursive: true })
  return dest
}

/** @deprecated use scaffoldDemo */
export function scaffoldApp(app: ScaffoldFramework, cwd = process.cwd()): string {
  return scaffoldDemo(app, cwd)
}

export function scaffoldApps(apps: ScaffoldFramework[], cwd = process.cwd()): string[] {
  return apps.map((app) => scaffoldDemo(app, cwd))
}

/**
 * Ensure product shell at `{product}-{framework}` from
 * `compiler/templates/{product}-{framework}`.
 * Does not wipe existing tree unless `force`.
 */
export function scaffoldProduct(opts: {
  product: ProductId
  framework: ScaffoldFramework
  cwd?: string
  force?: boolean
}): string {
  const cwd = resolve(opts.cwd ?? process.cwd())
  const { product, framework, force } = opts
  if (!PRODUCT_IDS.includes(product)) {
    throw new Error(`unknown product "${product}"; expected one of ${PRODUCT_IDS.join(', ')}`)
  }
  if (!SCAFFOLD_FRAMEWORKS.includes(framework)) {
    throw new Error(
      `unknown framework "${framework}"; expected one of ${SCAFFOLD_FRAMEWORKS.join(', ')}`,
    )
  }
  const slug = productShellSlug(product, framework)
  const src = join(templatesRoot(), slug)
  if (!existsSync(src)) {
    throw new Error(
      `missing product template: ${src} (tryb B slice may not support ${slug} yet)`,
    )
  }
  const dest = join(cwd, slug)
  if (existsSync(dest) && !force) {
    return dest
  }
  // Keep installed deps across --force convert (template refresh only).
  // Park beside `cwd` (same filesystem) — `os.tmpdir()` can be EXDEV vs the repo.
  const nm = join(dest, 'node_modules')
  let nmPark: string | null = null
  if (existsSync(nm)) {
    nmPark = join(cwd, `.nucleify-nm-${slug}-${process.pid}`)
    rmSync(nmPark, { recursive: true, force: true })
    renameSync(nm, nmPark)
  }
  rmSync(dest, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest, { recursive: true })
  if (nmPark && existsSync(nmPark)) {
    rmSync(nm, { recursive: true, force: true })
    renameSync(nmPark, nm)
  }
  return dest
}

export function productShellPath(product: ProductId, framework: ScaffoldFramework, cwd = process.cwd()): string {
  return resolve(cwd, productShellSlug(product, framework))
}
