import type { ShellSectionRevealSpec } from '../../utils/shell_section_reveal'
export const compilerReveal = {
  kind: 'copy-stage',
  copy: '.nuc-compiler-copy .nuc-eyebrow, .nuc-compiler-copy .nuc-title, .nuc-compiler-copy .nuc-support, .nuc-compiler-copy .nuc-next',
  stage: '.nuc-compiler-board',
} as const satisfies ShellSectionRevealSpec
