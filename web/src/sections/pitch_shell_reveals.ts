import type { ShellSectionRevealSpec } from '../utils/shell_section_reveal'
import { askReveal } from './ask/motion'
import { savingsReveal } from './savings/motion'
import { surfaceReveal } from './surface/motion'
import { thesisReveal } from './thesis/motion'
import { wedgeReveal } from './wedge/motion'

/** For static shells (Astro boot island) that cannot call section onMounted. */
export const pitchShellReveals: Array<{
  select: string
  reveal: ShellSectionRevealSpec
}> = [
  { select: '.nuc-thesis', reveal: thesisReveal },
  { select: '.nuc-savings', reveal: savingsReveal },
  { select: '.nuc-wedge', reveal: wedgeReveal },
  { select: '.nuc-surface', reveal: surfaceReveal },
  { select: '#ask.nuc-close', reveal: askReveal },
]
