import type { FrameSectionRevealSpec } from '../../types/frame'
export const compilerReveal = {
  kind: 'mask',
  items:
    '.nuc-compiler-copy .nuc-eyebrow, .nuc-compiler-copy .nuc-title, .nuc-compiler-copy .nuc-support, .nuc-compiler-copy .nuc-next, .nuc-compiler-board',
} as const satisfies FrameSectionRevealSpec
