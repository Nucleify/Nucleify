import type { FrameSectionRevealSpec } from '../../types/frame'
export const surfaceReveal = {
  kind: 'mask',
  items:
    '.nuc-surface-head .nuc-eyebrow, .nuc-surface-head .nuc-title, .nuc-surface-head .nuc-support, .nuc-surface-spotlight, .nuc-surface-tab',
} as const satisfies FrameSectionRevealSpec
