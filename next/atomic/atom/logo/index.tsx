import type { CSSProperties, JSX } from 'react'

import { defaultColors } from 'nucleify'

import type { LogoInterface } from './types'

export function AdLogo({
  dimensions = 44,
  nuiType,
}: LogoInterface): JSX.Element {
  const logoStyle: CSSProperties | undefined = nuiType
    ? {
        ['--logo-lighter-color' as string]: `var(--${nuiType}-c-s, var(--${nuiType}-c-u, var(--${nuiType}-c, ${defaultColors[`${nuiType}-c`] ?? '#60a5fa'})))`,
        ['--logo-darker-color' as string]: `var(--${nuiType}-d-s, var(--${nuiType}-d-u, var(--${nuiType}-d, ${defaultColors[`${nuiType}-d`] ?? '#1e40af'})))`,
      }
    : undefined

  return (
    <svg width={dimensions} height={dimensions} style={logoStyle}>
      <use href="#logo-symbol" />
    </svg>
  )
}
