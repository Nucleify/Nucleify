import type { CSSProperties, JSX } from 'react'

import { defaultColors } from 'nucleify'

import type { LogoInterface } from './types'

export function AdLogo({
  dimensions = 44,
  adType,
}: LogoInterface): JSX.Element {
  const logoStyle: CSSProperties | undefined = adType
    ? {
        ['--logo-lighter-color' as string]: `var(--${adType}-c-s, var(--${adType}-c-u, var(--${adType}-c, ${defaultColors[`${adType}-c`] ?? '#60a5fa'})))`,
        ['--logo-darker-color' as string]: `var(--${adType}-d-s, var(--${adType}-d-u, var(--${adType}-d, ${defaultColors[`${adType}-d`] ?? '#1e40af'})))`,
      }
    : undefined

  return (
    <svg width={dimensions} height={dimensions} style={logoStyle}>
      <use href="#logo-symbol" />
    </svg>
  )
}
