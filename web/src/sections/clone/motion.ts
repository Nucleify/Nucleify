import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const cloneReveal = {
  kind: 'copy-stage',
  copy: '.nuc-clone-copy .nuc-eyebrow, .nuc-clone-copy .nuc-title, .nuc-clone-copy .nuc-support, .nuc-clone-actions',
  stage: '.nuc-clone-term',
} as const satisfies ShellSectionRevealSpec
