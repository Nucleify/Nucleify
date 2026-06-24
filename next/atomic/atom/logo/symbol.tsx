import type { JSX } from 'react'

import styles from './index.module.scss'
import { AdLogoPaths } from './paths'
import type { LogoInterface } from './types'

export function AdLogoSymbol({
  dimensions = 44,
  lighterColorClass,
  darkerColorClass,
}: LogoInterface): JSX.Element {
  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2710 3140"
      width={dimensions}
      height={dimensions}
      style={{ display: 'none' }}
    >
      <symbol id="logo-symbol" viewBox="0 0 2710 3140">
        <AdLogoPaths
          lighterColorClass={cx(styles['lighter-color'], lighterColorClass)}
          darkerColorClass={cx(styles['darker-color'], darkerColorClass)}
        />
      </symbol>
    </svg>
  )
}
