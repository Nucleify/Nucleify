import type { FrameSectionRevealSpec } from '../../types/frame'
export const pillarsReveal = {
  kind: 'mask',
  items:
    '.nuc-eyebrow, .nuc-title, .nuc-support, .nuc-pillars-cta, .nuc-pillars-share, .nuc-pillars-item',
} as const satisfies FrameSectionRevealSpec
