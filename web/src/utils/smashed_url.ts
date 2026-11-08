import { NUC_DOCS_ORIGIN } from './docs_origin'

const LOCALE_CODES = new Set(['en', 'pl', 'vn'])

/** Longest-first tokens from the old marketing + docs surface. */
const SMASH_TOKENS = [
  'feature-sliced-design',
  'people-and-credits',
  'website-redesign',
  'ecommerce-stores',
  'custom-projects',
  'business-websites',
  'landing-pages',
  'coding-standards',
  'getting-started',
  'core-concepts',
  'terms-of-service',
  'privacy-policy',
  'code-of-conduct',
  'activity-log',
  'configuration',
  'quick-start',
  'installation',
  'introduction',
  'about-us',
  'entities',
  'contacts',
  'structural',
  'services',
  'process',
  'cookies',
  'modules',
  'register',
  'password',
  'dashboard',
  'settings',
  'logout',
  'login',
  'admin',
  'files',
  'offer',
  'blog',
  'home',
  'docs',
  'gdpr',
  'dev',
  'legal',
  'en',
  'pl',
  'vn',
].sort((a, b) => b.length - a.length)

const ASSET_FIRST = new Set([
  '_nuxt',
  '_redirects',
  '_robots.txt',
  'api',
  'img',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
])

const DEAD_ROOTS = new Set([
  'home',
  'services',
  'about',
  'about-us',
  'blog',
  'license',
  'login',
  'register',
  'admin',
  'modules',
  'activity-log',
  'logout',
  'password',
  'entities',
  'structural',
  'files',
  'dashboard',
  'settings',
  'offer',
  'process',
  'gdpr',
  'cookies',
  'privacy-policy',
  'terms-of-service',
  'legal',
  'dev',
])

function tokenizeSmash(segment: string): string[] {
  const tokens: string[] = []
  let rest = segment.toLowerCase()

  while (rest.length > 0) {
    const hit = SMASH_TOKENS.find(
      (token) => rest === token || rest.startsWith(token)
    )
    if (!hit) return []
    tokens.push(hit)
    rest = rest.slice(hit.length)
  }

  return tokens
}

/** True when a path segment is several old slugs glued without `/`. */
export function isSmashedSegment(segment: string): boolean {
  if (!segment || segment.includes('.') || segment.includes('{')) return false
  const tokens = tokenizeSmash(segment)
  return tokens.length >= 2
}

function hasDuplicateAdjacent(parts: string[]): boolean {
  for (let i = 1; i < parts.length; i += 1) {
    if (parts[i] === parts[i - 1]) return true
  }
  return false
}

function homeForLocale(locale: string | undefined): string {
  if (locale && LOCALE_CODES.has(locale)) return `/${locale}/home`
  return '/en/home'
}

function localeHint(parts: string[]): string | undefined {
  const first = parts[0]
  if (!first) return undefined
  if (LOCALE_CODES.has(first)) return first

  const tokens = tokenizeSmash(first)
  return tokens.find((token) => LOCALE_CODES.has(token))
}

/**
 * Legacy / smashed paths → living home.
 * Docs live on docs.nucleify.io - rewrite old same-host `/…/docs/…` there.
 */
export function redirectTargetForPath(pathname: string): string | null {
  const path = pathname.split('?')[0] || '/'
  const parts = path.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const first = parts[0]!
  if (ASSET_FIRST.has(first)) return null

  // Nuxt payloadExtraction serves `/…/_payload.js` under the page path.
  // Must not collapse those onto home or hydration loads HTML as a module.
  const last = parts[parts.length - 1]!
  if (last === '_payload.js' || last === '_payload.json') return null

  // Docs moved off nucleify.io - send locale docs paths to the docs host.
  if (LOCALE_CODES.has(first) && parts[1] === 'docs') {
    const rest = parts.slice(1).join('/')
    return `${NUC_DOCS_ORIGIN}/${first}/${rest}`
  }

  // Exact living marketing home.
  if (LOCALE_CODES.has(first) && parts[1] === 'home' && parts.length === 2) {
    return null
  }

  // Exact living investor pitch.
  if (
    LOCALE_CODES.has(first) &&
    parts[1] === 'investor' &&
    parts.length === 2
  ) {
    return null
  }

  // Exact living migrations-company pitch.
  if (
    LOCALE_CODES.has(first) &&
    parts[1] === 'migrations-company' &&
    parts.length === 2
  ) {
    return null
  }

  // Legacy `/company` → migrations-company.
  if (LOCALE_CODES.has(first) && parts[1] === 'company') {
    return `/${first}/migrations-company`
  }

  // Exact living thank-you (post contact form).
  if (
    LOCALE_CODES.has(first) &&
    parts[1] === 'thank-you' &&
    parts.length === 2
  ) {
    return null
  }

  // Bare locale is handled by routeRules.
  if (LOCALE_CODES.has(first) && parts.length === 1) return null

  const locale = localeHint(parts)

  // Any smashed segment (canonical bug + relative crawl compounding).
  if (parts.some((part) => isSmashedSegment(part))) {
    return homeForLocale(locale)
  }

  // `/en/services/services/...`, `/home/home/...`
  if (hasDuplicateAdjacent(parts)) {
    return homeForLocale(locale)
  }

  // Template leftovers from the old sitemap.
  if (path.includes('{') || path.includes('}')) {
    return homeForLocale(locale)
  }

  // `/{lang}/home/...` extras no longer exist.
  if (LOCALE_CODES.has(first) && parts[1] === 'home' && parts.length > 2) {
    return homeForLocale(first)
  }

  // `/{lang}/investor/...` extras - collapse to investor root.
  if (LOCALE_CODES.has(first) && parts[1] === 'investor' && parts.length > 2) {
    return `/${first}/investor`
  }

  // `/{lang}/migrations-company/...` extras - collapse to page root.
  if (
    LOCALE_CODES.has(first) &&
    parts[1] === 'migrations-company' &&
    parts.length > 2
  ) {
    return `/${first}/migrations-company`
  }

  // `/{lang}/thank-you/...` extras - collapse to thank-you root.
  if (LOCALE_CODES.has(first) && parts[1] === 'thank-you' && parts.length > 2) {
    return `/${first}/thank-you`
  }

  // `/{lang}/services|legal|about-us|...` — known dead marketing tree only.
  // Arbitrary CMS slugs must reach `[lang]/[slug]` (existence → render / else → home).
  if (
    LOCALE_CODES.has(first) &&
    parts[1] &&
    DEAD_ROOTS.has(parts[1]) &&
    parts[1] !== 'home'
  ) {
    return homeForLocale(first)
  }

  // First segment must be a real locale (`en` | `pl` | `vn`). Anything else
  // (`/afdhjzfhdsjshfdj/home`, glued junk, dead roots) is crawl noise — do not
  // let `[lang]/[slug]` await a 404 locale fetch before painting sections.
  if (!LOCALE_CODES.has(first)) {
    return homeForLocale(locale)
  }

  return null
}
