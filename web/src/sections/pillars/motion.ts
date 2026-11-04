import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const pillarsReveal = {
  kind: 'mask',
  items:
    '.nuc-eyebrow, .nuc-title, .nuc-support, .nuc-pillars-cta, .nuc-pillars-share, .nuc-pillars-item',
} as const satisfies ShellSectionRevealSpec
