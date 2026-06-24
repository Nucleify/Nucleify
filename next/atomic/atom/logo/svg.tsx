import type { JSX } from 'react'

import { AdLogoPaths } from './paths'
import type { LogoInterface } from './types'

export function AdLogoSvg({
  dimensions = 44,
  lighterColorClass,
  darkerColorClass,
}: LogoInterface): JSX.Element {
  return (
    <svg
      height={dimensions}
      width={dimensions}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2710 3140"
      version="1.1"
    >
      <AdLogoPaths
        lighterColorClass={lighterColorClass}
        darkerColorClass={darkerColorClass}
      />
    </svg>
  )
}
