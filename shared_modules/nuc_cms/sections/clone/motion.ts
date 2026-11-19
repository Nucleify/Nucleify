import type { FrameSectionRevealSpec } from '../../types/frame'
export const cloneReveal = {
  kind: 'copy-stage',
  copy: '.nuc-clone-copy .nuc-eyebrow, .nuc-clone-copy .nuc-title, .nuc-clone-copy .nuc-support, .nuc-clone-actions',
  stage: '.nuc-clone-term-wrap',
} as const satisfies FrameSectionRevealSpec
