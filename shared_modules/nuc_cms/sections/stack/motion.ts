import type { FrameSectionRevealSpec } from '../../types/frame'
export const stackReveal = {
  kind: 'stack-lattice',
  mask: '.nuc-eyebrow, .nuc-title, .nuc-support, .nuc-next, .nuc-stack-spotlight',
  lattice: '.nuc-stack-item',
} as const satisfies FrameSectionRevealSpec
