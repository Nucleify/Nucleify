import { useState } from 'nuxt/app'

import type { PageSection } from '@shared_modules'
export type ShellVariant = 'auto' | 'product' | 'pitch' | 'thankYou'

export type ShellPageConfig = {
  sections: PageSection[]
  railAriaLabel: string
  variant: ShellVariant
  pending: boolean
  enableIris?: boolean
  /** CMS page template key (default | shear | holo_cube). */
  template?: string
}

const PITCH_TYPES = new Set([
  'section.intro',
  'section.thesis',
  'section.savings',
  'section.wedge',
  'section.surface',
  'section.ask',
])

export function useShellPage() {
  return useState<ShellPageConfig>('nuc-shell-page', () => ({
    sections: [],
    railAriaLabel: 'Sections',
    variant: 'auto',
    pending: false,
    enableIris: true,
  }))
}

export function resolveShellVariant(
  sections: readonly PageSection[],
  variant: ShellVariant
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
