import type { FrameSectionRevealSpec } from '../../types/frame'
export const savingsReveal = {
  kind: 'mask',
  items:
    '.nuc-savings-head .nuc-eyebrow, .nuc-savings-head .nuc-title, .nuc-savings-head .nuc-support, .nuc-savings-cta, .nuc-savings-card, .nuc-savings-note',
} as const satisfies FrameSectionRevealSpec
