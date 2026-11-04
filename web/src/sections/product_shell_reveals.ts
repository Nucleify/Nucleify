import type { ShellSectionRevealSpec } from '../utils/shell_section_reveal'
import { cloneReveal } from './clone/motion'
import { closeReveal } from './close/motion'
import { compilerReveal } from './compiler_demo/motion'
import { pillarsReveal } from './pillars/motion'
import { pulseReveal } from './pulse/motion'
import { stackReveal } from './stack/motion'

/** For static shells (Astro boot island) that cannot call section onMounted. */
export const productShellReveals: Array<{
  select: string
  reveal: ShellSectionRevealSpec
}> = [
  { select: '.nuc-pillars', reveal: pillarsReveal },
  { select: '.nuc-stack', reveal: stackReveal },
  { select: '.nuc-pulse', reveal: pulseReveal },
  { select: '.nuc-compiler', reveal: compilerReveal },
  { select: '.nuc-clone', reveal: cloneReveal },
  { select: '.nuc-close', reveal: closeReveal },
]
