import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const askReveal = {
  kind: 'mask',
  items: '.nuc-close-copy, .nuc-close-cta, .nuc-close-footer',
} as const satisfies ShellSectionRevealSpec
