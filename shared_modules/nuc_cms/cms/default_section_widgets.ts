import type { WidgetDefinition } from './registry'

import { homeHeroWidget } from './widgets/home_hero'
import { homePillarsWidget } from './widgets/home_pillars'
import {
  homeCloneWidget,
  homeCloseWidget,
  homeCompilerDemoWidget,
  homePulseWidget,
  homeStackWidget,
  investorAskWidget,
  investorIntroWidget,
  investorSavingsWidget,
  investorSurfaceWidget,
  investorThesisWidget,
  investorWedgeWidget,
  thankYouWidget,
} from './widgets/marketing'

/**
 * Single marketing-section register for Vue pack + emit shells.
 * Add a section here (and its `sections/<slug>/` SFC); emit reads the same list.
 */
export const defaultSectionWidgets: WidgetDefinition[] = [
  homeHeroWidget,
  homePillarsWidget,
  homeCloneWidget,
  homeStackWidget,
  homeCompilerDemoWidget,
  homePulseWidget,
  homeCloseWidget,
  investorIntroWidget,
  investorThesisWidget,
  investorSavingsWidget,
  investorWedgeWidget,
  investorSurfaceWidget,
  investorAskWidget,
  thankYouWidget,
]

/** Solid public shell: sync-load iris/cipher-critical sections; rest lazy. */
export const SOLID_SYNC_SECTION_TYPES = new Set([
  'section.hero',
  'section.intro',
  'section.thank_you',
])
