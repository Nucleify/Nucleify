import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const stackReveal = {
  kind: 'stack-lattice',
  mask: '.nuc-eyebrow, .nuc-title, .nuc-support, .nuc-next, .nuc-stack-spotlight',
  lattice: '.nuc-stack-item',
} as const satisfies ShellSectionRevealSpec
