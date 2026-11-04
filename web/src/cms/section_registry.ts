import { type Component } from 'vue'

import { isSectionVisible } from './use_section_props'

import type { PageSection } from '@shared_modules'
import { resolveSectionAnchor, SECTION_ANCHOR_BY_TYPE } from '@shared_modules'
import AskSection from '../sections/ask/index.vue'
import CloneSection from '../sections/clone/index.vue'
import CloseSection from '../sections/close/index.vue'
import CompilerDemoSection from '../sections/compiler_demo/index.vue'
import HeroSection from '../sections/hero/index.vue'
import IntroSection from '../sections/intro/index.vue'
import PillarsSection from '../sections/pillars/index.vue'
import PulseSection from '../sections/pulse/index.vue'
import SavingsSection from '../sections/savings/index.vue'
import StackSection from '../sections/stack/index.vue'
import SurfaceSection from '../sections/surface/index.vue'
import ThankYouSection from '../sections/thank_you/index.vue'
import ThesisSection from '../sections/thesis/index.vue'
import WedgeSection from '../sections/wedge/index.vue'

export type CmsRailItem = {
  id: string
  label: string
}

/**
 * Sync registry — async section components SSR as comment placeholders and
 * break hydration against the client VDOM.
 */
const sectionsByType: Record<string, Component> = {
  'section.hero': HeroSection,
  'section.intro': IntroSection,
  'section.thank_you': ThankYouSection,
  'section.pillars': PillarsSection,
  'section.clone': CloneSection,
  'section.stack': StackSection,
  'section.compiler_demo': CompilerDemoSection,
  'section.pulse': PulseSection,
  'section.close': CloseSection,
  'section.thesis': ThesisSection,
  'section.savings': SavingsSection,
  'section.wedge': WedgeSection,
  'section.surface': SurfaceSection,
  'section.ask': AskSection,
}

export function resolveCmsSection(type: string): Component | undefined {
  return sectionsByType[type]
}

export function isKnownCmsSection(type: string): boolean {
  return Boolean(sectionsByType[type])
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
