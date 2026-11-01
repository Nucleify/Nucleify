import type { ShellBootOptions } from '../../utils/play_shell_animations'

/** Thank-you page shell boot — owned by the thank-you section. */
export const thankYouShellBoot = {
  mode: 'thankYou',
  quietAddsStatic: true,
  compactMaxWidth: 767,
  cipher: {
    selector: '.nuc-thank-you-title',
    fallbackText: 'Thanks - we got it.',
    glyphClass: 'nuc-thank-you-glyph',
    deferStartMs: null,
    durationBase: 680,
    durationStep: 42,
    delayBase: 120,
    delayStep: 36,
    settleMs: 1800,
  },
  iris: { delayMs: 40, setOrigin: false },
  bits: {
    title: '.nuc-thank-you-title',
    support: '.nuc-thank-you-support',
    cta: '.nuc-thank-you-cta',
    cube: '.nuc-thank-you-cube',
  },
} as const satisfies ShellBootOptions
