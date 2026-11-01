import type { PageSection } from './validate_layout'

import {
  HOME_PAGE_SEO,
  HOME_SECTION_DEFAULTS,
  INVESTOR_PAGE_SEO,
  INVESTOR_SECTION_DEFAULTS,
  THANK_YOU_PAGE_SEO,
  THANK_YOU_SECTION_DEFAULTS,
} from './defaults/marketing_props'

export type { PageSection }

function section(
  id: string,
  type: string,
  order: number,
  defaults: Record<string, Record<string, unknown>>
): PageSection {
  const props = defaults[type]
  return {
    id,
    type,
    order,
    props: props ? (structuredClone(props) as Record<string, unknown>) : {},
  }
}

/** Canonical home composition — matches published `home` layout sections. */
export const DEFAULT_HOME_SECTIONS: PageSection[] = [
  section('home-hero', 'section.hero', 0, HOME_SECTION_DEFAULTS as never),
  section('home-pillars', 'section.pillars', 1, HOME_SECTION_DEFAULTS as never),
  section('home-clone', 'section.clone', 2, HOME_SECTION_DEFAULTS as never),
  section('home-stack', 'section.stack', 3, HOME_SECTION_DEFAULTS as never),
  section(
    'home-compiler',
    'section.compiler_demo',
    4,
    HOME_SECTION_DEFAULTS as never
  ),
  section('home-pulse', 'section.pulse', 5, HOME_SECTION_DEFAULTS as never),
  section('home-close', 'section.close', 6, HOME_SECTION_DEFAULTS as never),
]

/** Canonical investor composition — matches published `investor` layout sections. */
export const DEFAULT_INVESTOR_SECTIONS: PageSection[] = [
  section(
    'investor-intro',
    'section.intro',
    0,
    INVESTOR_SECTION_DEFAULTS as never
  ),
  section(
    'investor-thesis',
    'section.thesis',
    1,
    INVESTOR_SECTION_DEFAULTS as never
  ),
  section(
    'investor-savings',
    'section.savings',
    2,
    INVESTOR_SECTION_DEFAULTS as never
  ),
  section(
    'investor-wedge',
    'section.wedge',
    3,
    INVESTOR_SECTION_DEFAULTS as never
  ),
  section(
    'investor-surface',
    'section.surface',
    4,
    INVESTOR_SECTION_DEFAULTS as never
  ),
  section('investor-ask', 'section.ask', 5, INVESTOR_SECTION_DEFAULTS as never),
]

/** Canonical thank-you composition — single confirmation section. */
export const DEFAULT_THANK_YOU_SECTIONS: PageSection[] = [
  section(
    'thank-you-main',
    'section.thank_you',
    0,
    THANK_YOU_SECTION_DEFAULTS as never
  ),
]

export const DEFAULT_HOME_SEO = {
  title: HOME_PAGE_SEO.title,
  description: HOME_PAGE_SEO.description,
}

export const DEFAULT_INVESTOR_SEO = {
  title: INVESTOR_PAGE_SEO.title,
  description: INVESTOR_PAGE_SEO.description,
}

export const DEFAULT_THANK_YOU_SEO = {
  title: THANK_YOU_PAGE_SEO.title,
  description: THANK_YOU_PAGE_SEO.description,
}

/** DOM anchor id for scroll rail / observeActiveSection. */
export const SECTION_ANCHOR_BY_TYPE: Record<string, string> = {
  'section.hero': 'intro',
  'section.pillars': 'architecture',
  'section.clone': 'clone',
  'section.stack': 'stack',
  'section.compiler_demo': 'compiler',
  'section.pulse': 'pulse',
  'section.close': 'start',
  'section.intro': 'intro',
  'section.thesis': 'thesis',
  'section.savings': 'savings',
  'section.wedge': 'wedge',
  'section.surface': 'surface',
  'section.ask': 'ask',
}

export const CMS_CANONICAL_PAGE_SLUGS = [
  'home',
  'investor',
  'thank-you',
] as const

export function listCmsPageSlugs(): string[] {
  return [...CMS_CANONICAL_PAGE_SLUGS]
}

export function defaultSectionsForSlug(slug: string): PageSection[] {
  if (slug === 'home') return DEFAULT_HOME_SECTIONS.map((s) => ({ ...s }))
  if (slug === 'investor')
    return DEFAULT_INVESTOR_SECTIONS.map((s) => ({ ...s }))
  if (slug === 'thank-you')
    return DEFAULT_THANK_YOU_SECTIONS.map((s) => ({ ...s }))
  return []
}

export function resolveSectionAnchor(
  type: string,
  props?: Record<string, unknown> | null
): string | undefined {
  const fromProps =
    props && typeof props.anchorId === 'string' ? props.anchorId.trim() : ''
  if (fromProps) return fromProps
  return SECTION_ANCHOR_BY_TYPE[type]
}
