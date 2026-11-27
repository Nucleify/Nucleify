import { NUC_COMPANY_COPY } from './content/company'
import { homeDocsHref, homeHref, NUC_HOME_COPY } from './content/home'
import { NUC_INVESTOR_COPY } from './content/investor'

export const FOOTER_TEMPLATE_HOME = 'home' as const
export const FOOTER_TEMPLATE_INVESTOR = 'investor' as const
export const FOOTER_TEMPLATE_COMPANY = 'company' as const

/** @deprecated use FOOTER_TEMPLATE_HOME — kept for legacy global drafts */
export const FOOTER_TEMPLATE_CLOSE = FOOTER_TEMPLATE_HOME

export const FOOTER_TEMPLATE_IDS = [
  FOOTER_TEMPLATE_HOME,
  FOOTER_TEMPLATE_INVESTOR,
  FOOTER_TEMPLATE_COMPANY,
] as const

export type FooterTemplateId = (typeof FOOTER_TEMPLATE_IDS)[number]

export type FooterLink = { label: string; href: string }

export const FOOTER_SEPARATOR_DOT = 'dot' as const
export const FOOTER_SEPARATOR_BULLET = 'bullet' as const
export const FOOTER_SEPARATOR_PIPE = 'pipe' as const
export const FOOTER_SEPARATOR_SLASH = 'slash' as const
export const FOOTER_SEPARATOR_NONE = 'none' as const

export const FOOTER_SEPARATOR_IDS = [
  FOOTER_SEPARATOR_DOT,
  FOOTER_SEPARATOR_BULLET,
  FOOTER_SEPARATOR_PIPE,
  FOOTER_SEPARATOR_SLASH,
  FOOTER_SEPARATOR_NONE,
] as const

export type FooterSeparatorId = (typeof FOOTER_SEPARATOR_IDS)[number]

export const FOOTER_SEPARATOR_OPTIONS: {
  label: string
  value: FooterSeparatorId
  sample: string
}[] = [
  { label: 'Dot (·)', value: FOOTER_SEPARATOR_DOT, sample: '·' },
  { label: 'Bullet (•)', value: FOOTER_SEPARATOR_BULLET, sample: '•' },
  { label: 'Pipe (|)', value: FOOTER_SEPARATOR_PIPE, sample: '|' },
  { label: 'Slash (/)', value: FOOTER_SEPARATOR_SLASH, sample: '/' },
  { label: 'None', value: FOOTER_SEPARATOR_NONE, sample: '' },
]

export function isFooterSeparatorId(
  value: unknown
): value is FooterSeparatorId {
  return (
    typeof value === 'string' &&
    (FOOTER_SEPARATOR_IDS as readonly string[]).includes(value)
  )
}

export function footerSeparatorSample(id: FooterSeparatorId): string {
  return FOOTER_SEPARATOR_OPTIONS.find((row) => row.value === id)?.sample ?? '·'
}

export type FooterTemplateData = {
  brand: string
  links: FooterLink[]
  /** Glyph between links; `none` = gap only. */
  separator: FooterSeparatorId
}

export type FooterTemplatesMap = Record<FooterTemplateId, FooterTemplateData>

export const FOOTER_TEMPLATE_OPTIONS: {
  label: string
  value: FooterTemplateId
  page: string
  description: string
}[] = [
  {
    label: 'Home',
    value: FOOTER_TEMPLATE_HOME,
    page: '/en/home',
    description: 'Links under the contact form on the product home page',
  },
  {
    label: 'Investor',
    value: FOOTER_TEMPLATE_INVESTOR,
    page: '/en/investor',
    description: 'Links under the ask form on the investor pitch',
  },
  {
    label: 'Migrations company',
    value: FOOTER_TEMPLATE_COMPANY,
    page: '/en/migrations-company',
    description: 'Links under the ask form on the migrations-company pitch',
  },
]

export function isFooterTemplateId(value: unknown): value is FooterTemplateId {
  return (
    typeof value === 'string' &&
    (FOOTER_TEMPLATE_IDS as readonly string[]).includes(value)
  )
}

export function footerTemplateForPageSlug(slug: string): FooterTemplateId {
  const key = String(slug || '')
    .trim()
    .replace(/^\/+|\/+$/g, '')
  if (key === 'investor') return FOOTER_TEMPLATE_INVESTOR
  if (key === 'migrations-company') return FOOTER_TEMPLATE_COMPANY
  return FOOTER_TEMPLATE_HOME
}

export function defaultFooterLinksHome(lang = 'en'): FooterLink[] {
  return [
    { label: NUC_HOME_COPY.navDocs, href: homeDocsHref(lang, 'intro') },
    { label: NUC_HOME_COPY.navPlay, href: NUC_HOME_COPY.playgroundHref },
    { label: NUC_HOME_COPY.navCli, href: NUC_HOME_COPY.cliHref },
    { label: NUC_HOME_COPY.navGitHub, href: NUC_HOME_COPY.githubHref },
  ]
}

export function defaultFooterLinksInvestor(lang = 'en'): FooterLink[] {
  return [
    { label: NUC_INVESTOR_COPY.navHome, href: homeHref(lang) },
    { label: NUC_INVESTOR_COPY.navDocs, href: homeDocsHref(lang, 'intro') },
    {
      label: NUC_INVESTOR_COPY.navPlay,
      href: NUC_INVESTOR_COPY.playgroundHref,
    },
    { label: NUC_INVESTOR_COPY.navCli, href: NUC_INVESTOR_COPY.cliHref },
    { label: NUC_INVESTOR_COPY.navGitHub, href: NUC_INVESTOR_COPY.githubHref },
  ]
}

export function defaultFooterLinksCompany(lang = 'en'): FooterLink[] {
  return [
    { label: NUC_COMPANY_COPY.navHome, href: homeHref(lang) },
    { label: NUC_COMPANY_COPY.navDocs, href: homeDocsHref(lang, 'intro') },
    { label: NUC_COMPANY_COPY.navPlay, href: NUC_COMPANY_COPY.playgroundHref },
    { label: NUC_COMPANY_COPY.navCli, href: NUC_COMPANY_COPY.cliHref },
    { label: NUC_COMPANY_COPY.navGitHub, href: NUC_COMPANY_COPY.githubHref },
  ]
}

/** @deprecated prefer defaultFooterLinksHome / template-specific helpers */
export function defaultFooterLinks(lang = 'en'): FooterLink[] {
  return defaultFooterLinksHome(lang)
}

export function defaultFooterTemplates(lang = 'en'): FooterTemplatesMap {
  return {
    home: {
      brand: NUC_HOME_COPY.brand,
      links: defaultFooterLinksHome(lang),
      separator: FOOTER_SEPARATOR_DOT,
    },
    investor: {
      brand: NUC_HOME_COPY.brand,
      links: defaultFooterLinksInvestor(lang),
      separator: FOOTER_SEPARATOR_DOT,
    },
    company: {
      brand: NUC_HOME_COPY.brand,
      links: defaultFooterLinksCompany(lang),
      separator: FOOTER_SEPARATOR_DOT,
    },
  }
}

export function defaultFooterGlobalData(lang = 'en'): Record<string, unknown> {
  return {
    menuSlug: '',
    templates: defaultFooterTemplates(lang),
  }
}

function readLinks(raw: unknown): FooterLink[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((row) => {
      if (!row || typeof row !== 'object') return null
      const item = row as Record<string, unknown>
      const label = String(item.label || '').trim()
      const href = String(item.href || '').trim()
      if (!label || !href) return null
      return { label, href }
    })
    .filter((row): row is FooterLink => Boolean(row))
}

function readTemplate(
  raw: unknown,
  fallback: FooterTemplateData
): FooterTemplateData {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return structuredClone(fallback)
  }
  const data = raw as Record<string, unknown>
  const brand = String(data.brand || '').trim() || fallback.brand
  const links = readLinks(data.links)
  const separator = isFooterSeparatorId(data.separator)
    ? data.separator
    : fallback.separator
  return {
    brand,
    links: links.length ? links : structuredClone(fallback.links),
    separator,
  }
}

/**
 * Normalize legacy `{ brand, links, template }` drafts into `{ templates }`.
 */
export function normalizeFooterGlobalData(
  raw: Record<string, unknown> | null | undefined,
  lang = 'en'
): Record<string, unknown> {
  const defaults = defaultFooterGlobalData(lang)
  const data = raw && typeof raw === 'object' ? raw : {}
  const fallbacks = defaultFooterTemplates(lang)

  const templatesRaw =
    data.templates &&
    typeof data.templates === 'object' &&
    !Array.isArray(data.templates)
      ? (data.templates as Record<string, unknown>)
      : null

  const templates: FooterTemplatesMap = {
    home: readTemplate(templatesRaw?.home, fallbacks.home),
    investor: readTemplate(templatesRaw?.investor, fallbacks.investor),
    company: readTemplate(templatesRaw?.company, fallbacks.company),
  }

  // Legacy single-template draft → seed home (or mapped template).
  if (!templatesRaw) {
    const legacyLinks = readLinks(data.links)
    const legacyBrand = String(data.brand || '').trim()
    if (legacyLinks.length || legacyBrand) {
      const legacyId =
        (data.template as string) === 'close'
          ? FOOTER_TEMPLATE_HOME
          : isFooterTemplateId(data.template)
            ? data.template
            : FOOTER_TEMPLATE_HOME
      templates[legacyId] = {
        brand: legacyBrand || fallbacks[legacyId].brand,
        links: legacyLinks.length ? legacyLinks : fallbacks[legacyId].links,
        separator: fallbacks[legacyId].separator,
      }
    }
  }

  return {
    menuSlug: String(data.menuSlug ?? defaults.menuSlug).trim(),
    templates,
  }
}

export function resolveFooterTemplateData(
  data: Record<string, unknown>,
  templateId: FooterTemplateId,
  lang = 'en'
): FooterTemplateData {
  const normalized = normalizeFooterGlobalData(data, lang)
  const templates = normalized.templates as FooterTemplatesMap
  return templates[templateId] ?? defaultFooterTemplates(lang)[templateId]
}
