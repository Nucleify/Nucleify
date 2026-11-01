import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const pulseReveal = {
  kind: 'copy-stage',
  copy: '.nuc-pulse-copy .nuc-eyebrow, .nuc-pulse-copy .nuc-title, .nuc-pulse-copy .nuc-support, .nuc-pulse-copy .nuc-pulse-compare, .nuc-pulse-copy .nuc-next',
  stage: '.nuc-pulse-stage',
} as const satisfies ShellSectionRevealSpec
