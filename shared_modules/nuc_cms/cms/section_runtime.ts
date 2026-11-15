import { resolveSectionAnchor } from './default_pages'
import { isKnownCmsSection } from './registry'
import { isSectionVisible } from './use_section_props'
import type { PageSection } from './validate_layout'

export type CmsRailItem = {
  id: string
  label: string
}

/** Closing / contact panels that should stay last so the footer stays at the end. */
export const CMS_CLOSING_SECTION_TYPES = new Set([
  'section.close',
  'section.ask',
  'section.thank_you',
])

export function orderedKnownSections(
  sections: PageSection[] | undefined | null
): PageSection[] {
  return [...(sections ?? [])]
    .filter((s) => isKnownCmsSection(s.type))
    .filter((s) => isSectionVisible(s.props))
    .sort((a, b) => a.order - b.order)
}

/**
 * Map CMS section id → unique DOM / rail anchor.
 * Duplicate widget types get `-2`, `-3`, … so rail + scroll stay stable.
 */
export function uniqueAnchorsBySectionId(
  sections: PageSection[]
): Map<string, string> {
  const counts = new Map<string, number>()
  const out = new Map<string, string>()
  // Do not require Vue component registration — anchors are metadata-only.
  const ordered = [...(sections ?? [])]
    .filter((s) => typeof s.type === 'string' && s.type.length > 0)
    .filter((s) => isSectionVisible(s.props))
    .sort((a, b) => a.order - b.order)
  for (const section of ordered) {
    const base =
      resolveSectionAnchor(section.type, section.props)?.trim() ||
      section.id.replace(/[^a-zA-Z0-9_-]/g, '-') ||
      'section'
    const n = counts.get(base) ?? 0
    counts.set(base, n + 1)
    out.set(section.id, n === 0 ? base : `${base}-${n + 1}`)
  }
  return out
}

export function railItemsFromSections(sections: PageSection[]): CmsRailItem[] {
  const anchors = uniqueAnchorsBySectionId(sections)
  return orderedKnownSections(sections).map((section) => {
    const fromProps =
      section.props && typeof section.props.railLabel === 'string'
        ? section.props.railLabel.trim()
        : ''
    const anchor = anchors.get(section.id) || section.id
    // Rail key = CMS section id (unique). Label stays human (Ship / Intro).
    return { id: section.id, label: fromProps || anchor }
  })
}

export function sectionBindAttrs(
  section: PageSection,
  options?: { anchor?: string; frameLast?: boolean }
): Record<string, unknown> {
  const anchor =
    options?.anchor ||
    resolveSectionAnchor(section.type, section.props) ||
    section.id
  return {
    ...(section.props ?? {}),
    // Prefer explicit anchorId — `id` alone can be awkward in attrs/SSR.
    anchorId: anchor,
    id: anchor,
    'data-section-id': section.id,
    frameLast: options?.frameLast === true,
  }
}
