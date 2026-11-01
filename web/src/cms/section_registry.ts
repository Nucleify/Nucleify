import { type Component, defineAsyncComponent } from 'vue'

import { isSectionVisible } from './use_section_props'

import type { PageSection } from '@shared_modules'
import { resolveSectionAnchor, SECTION_ANCHOR_BY_TYPE } from '@shared_modules'
import HeroSection from '../sections/hero/index.vue'
import IntroSection from '../sections/intro/index.vue'
import ThankYouSection from '../sections/thank_you/index.vue'

export type CmsRailItem = {
  id: string
  label: string
}

/** Sync: iris/cipher boot needs these in DOM before layout `onMounted` plays motion. */
const syncSections: Record<string, Component> = {
  'section.hero': HeroSection,
  'section.intro': IntroSection,
  'section.thank_you': ThankYouSection,
}

const loaders: Record<string, () => Promise<Component>> = {
  'section.pillars': () => import('../sections/pillars/index.vue'),
  'section.clone': () => import('../sections/clone/index.vue'),
  'section.stack': () => import('../sections/stack/index.vue'),
  'section.compiler_demo': () => import('../sections/compiler_demo/index.vue'),
  'section.pulse': () => import('../sections/pulse/index.vue'),
  'section.close': () => import('../sections/close/index.vue'),
  'section.thesis': () => import('../sections/thesis/index.vue'),
  'section.savings': () => import('../sections/savings/index.vue'),
  'section.wedge': () => import('../sections/wedge/index.vue'),
  'section.surface': () => import('../sections/surface/index.vue'),
  'section.ask': () => import('../sections/ask/index.vue'),
}

const cache = new Map<string, Component>()

export function resolveCmsSection(type: string): Component | undefined {
  const sync = syncSections[type]
  if (sync) return sync
  const loader = loaders[type]
  if (!loader) return undefined
  let component = cache.get(type)
  if (!component) {
    component = defineAsyncComponent(loader)
    cache.set(type, component)
  }
  return component
}

export function isKnownCmsSection(type: string): boolean {
  return Boolean(syncSections[type] || loaders[type])
}

export function orderedKnownSections(
  sections: PageSection[] | undefined | null
): PageSection[] {
  return [...(sections ?? [])]
    .filter((s) => isKnownCmsSection(s.type))
    .filter((s) => isSectionVisible(s.props))
    .sort((a, b) => a.order - b.order)
}

export function railItemsFromSections(sections: PageSection[]): CmsRailItem[] {
  return orderedKnownSections(sections).flatMap((section) => {
    const id = resolveSectionAnchor(section.type, section.props)
    if (!id) return []
    const fromProps =
      section.props && typeof section.props.railLabel === 'string'
        ? section.props.railLabel.trim()
        : ''
    return [{ id, label: fromProps || id }]
  })
}

export function sectionBindAttrs(
  section: PageSection
): Record<string, unknown> {
  return {
    ...(section.props ?? {}),
    'data-section-id': section.id,
  }
}

export { resolveSectionAnchor, SECTION_ANCHOR_BY_TYPE }
