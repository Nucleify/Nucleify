import type { FrameSectionRevealSpec } from '../types/frame'
import { askReveal } from './ask/motion'
import { savingsReveal } from './savings/motion'
import { surfaceReveal } from './surface/motion'
import { thesisReveal } from './thesis/motion'
import { wedgeReveal } from './wedge/motion'

/** For static shells (Astro boot island) that cannot call section onMounted. */
export const pitchShellReveals: Array<{
  select: string
  reveal: FrameSectionRevealSpec
}> = [
  { select: '.nuc-thesis', reveal: thesisReveal },
  { select: '.nuc-savings', reveal: savingsReveal },
  { select: '.nuc-wedge', reveal: wedgeReveal },
  { select: '.nuc-surface', reveal: surfaceReveal },
  { select: '#ask.nuc-close', reveal: askReveal },
]
