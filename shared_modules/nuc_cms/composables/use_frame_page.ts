import { useState } from 'nuxt/app'

import type { PageSection } from '../cms/validate_layout'
export type FrameVariant = 'auto' | 'product' | 'pitch' | 'thankYou'

export type FramePageConfig = {
  sections: PageSection[]
  railAriaLabel: string
  variant: FrameVariant
  pending: boolean
  /** Page frame template id (`rail` / `bare` / …). */
  template?: string
  enableIris?: boolean
  /** Top nav visibility (admin page chrome). */
  showMenu?: boolean
  /** cms_menus slug for top nav (falls back to header global). */
  menuSlug?: string
  /** Side rail visibility (admin page chrome). */
  showRail?: boolean
  /** Shear backdrop visibility (admin page chrome). */
  showShear?: boolean
  /** Closing-section footer visibility (admin page chrome). */
  showFooter?: boolean
  /** cms_menus slug for closing footer (falls back to footer global). */
  footerMenuSlug?: string
  /** Footer template pack id (`home` / `investor` / `company`). */
  footerTemplate?: string
  /**
   * Bumped on live section reorder so the layout can soft-settle visible
   * panels without replaying iris / full frame boot.
   */
  softRevealTick?: number
  /** Slide index to keep after a live reorder (do not follow the moved section). */
  preserveSlideIndex?: number | null
  /** CMS section id to keep active on the rail after a soft live edit. */
  preserveSectionId?: string | null
  /**
   * Live add/remove/type edit — soft-settle the current slide instead of
   * replaying iris (which would jump back to slide 0).
   */
  softMotionOnly?: boolean
  /**
   * Soft reveal flavor — `append` hard-cuts to the new last slide and
   * replays its entrance (no scroll through intermediate panels).
   */
  softRevealMode?: 'append' | null
}

const PITCH_TYPES = new Set([
  'section.intro',
  'section.thesis',
  'section.savings',
  'section.wedge',
  'section.surface',
  'section.ask',
])

export function useFramePage() {
  return useState<FramePageConfig>('nuc-frame-page', () => ({
    sections: [],
    railAriaLabel: 'Sections',
    variant: 'auto',
    pending: false,
    template: 'rail',
    enableIris: true,
    showMenu: false,
    menuSlug: 'primary',
    showRail: true,
    showShear: true,
    showFooter: true,
    footerMenuSlug: '',
    footerTemplate: 'home',
  }))
}

export function resolveFrameVariant(
  sections: readonly PageSection[],
  variant: FrameVariant
): 'product' | 'pitch' | 'thankYou' {
  if (variant === 'product' || variant === 'pitch' || variant === 'thankYou') {
    return variant
  }
  const onlyThankYou =
    sections.length > 0 && sections.every((s) => s.type === 'section.thank_you')
  if (onlyThankYou) return 'thankYou'
  const hasPitch = sections.some((s) => PITCH_TYPES.has(s.type))
  const hasProduct = sections.some((s) => !PITCH_TYPES.has(s.type))
  if (hasPitch && !hasProduct) return 'pitch'
  return 'product'
}
