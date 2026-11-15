import type { FrameSectionRevealSpec } from '../../types/frame'
export const thesisReveal = {
  kind: 'mask',
  items:
    '.nuc-thesis-head .nuc-eyebrow, .nuc-thesis-head .nuc-title, .nuc-thesis-head .nuc-support, .nuc-thesis-cta, .nuc-thesis-viz, .nuc-thesis-card',
} as const satisfies FrameSectionRevealSpec
