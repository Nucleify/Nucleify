import type { JSX } from 'react'

import { defaultColors } from '../../../modules/nuc_colors/atomic/boson/constants/default'
import type { LogoInterface } from './types'

export function AdLogo({
  dimensions = 44,
  adType,
}: LogoInterface): JSX.Element {
  const logoStyle = adType
    ? {
        '--logo-lighter-color': `var(--${adType}-c-s, var(--${adType}-c-u, ${defaultColors[`${adType}-c`] ?? '#60a5fa'}))`,
        '--logo-darker-color': `var(--${adType}-d-s, var(--${adType}-d-u, ${defaultColors[`${adType}-d`] ?? '#1e40af'}))`,
      }
    : undefined

  return (
    <svg width={dimensions} height={dimensions} style={logoStyle}>
      <use href="#logo-symbol" />
    </svg>
  )
}
