import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const wedgeReveal = {
  kind: 'mask',
  items:
    '.nuc-wedge-head .nuc-eyebrow, .nuc-wedge-head .nuc-title, .nuc-wedge-head .nuc-support, .nuc-wedge-card',
} as const satisfies ShellSectionRevealSpec
