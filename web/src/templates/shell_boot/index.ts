import type { ShellBootOptions } from '../../utils/play_shell_animations'

/** Shared hero bit selectors for marketing shell boot. */
const marketingHeroBits = {
  rail: '.nuc-rail',
  eyebrow: '.nuc-hero-eyebrow',
  mark: '.nuc-hero-mark',
  headline: '.nuc-hero-headline',
  support: '.nuc-hero-support',
  cta: '.nuc-hero-cta',
  panel: '.nuc-hero-panel',
} as const

/** Product home shell boot (iris, hero cipher, chrome) — section reveals live with sections. */
export const productShellBoot = {
  mode: 'marketing',
  quietAddsStatic: true,
  compactMaxWidth: 960,
  includeNav: false,
  clearExtra: '.nuc-anim-mask, .nuc-anim-lattice',
  warmFontsAlways: false,
  cipher: {
    selector: '.nuc-hero-brand',
    fallbackText: 'Nucleify',
    glyphClass: 'nuc-hero-glyph',
    deferStartMs: 100,
  },
  bits: marketingHeroBits,
  iris: {},
} as const satisfies ShellBootOptions

/** Investor pitch shell boot — section reveals live with pitch sections. */
export const pitchShellBoot = {
  mode: 'marketing',
  quietAddsStatic: false,
  compactMaxWidth: 960,
  includeNav: false,
  clearExtra: '.nuc-anim-mask',
  warmFontsAlways: true,
  cipher: {
    selector: '.nuc-hero-brand',
    fallbackText: 'Nucleify',
    glyphClass: 'nuc-hero-glyph',
    deferStartMs: 100,
  },
  bits: marketingHeroBits,
  iris: {},
} as const satisfies ShellBootOptions
