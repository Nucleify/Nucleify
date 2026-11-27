import type { FrameSectionRevealSpec } from '../../types/frame'
export const askReveal = {
  kind: 'mask',
  items: '.nuc-close-copy, .nuc-close-cta, .nuc-close-footer',
} as const satisfies FrameSectionRevealSpec
