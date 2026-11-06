import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const savingsReveal = {
  kind: 'mask',
  items:
    '.nuc-savings-head .nuc-eyebrow, .nuc-savings-head .nuc-title, .nuc-savings-head .nuc-support, .nuc-savings-cta, .nuc-savings-card, .nuc-savings-note',
} as const satisfies ShellSectionRevealSpec
