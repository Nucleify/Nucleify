import type { JSX } from 'react'

import styles from './index.module.scss'
import type { SpacingInterface } from './types'

export function AdSpacing({
  className,
  size = 'normal',
}: SpacingInterface = {}): JSX.Element {
  const sizeClass = size === 'normal' ? undefined : styles[`ad-spacing-${size}`]

  return (
    <div
      className={[styles['ad-spacing'], sizeClass, className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    />
  )
}
