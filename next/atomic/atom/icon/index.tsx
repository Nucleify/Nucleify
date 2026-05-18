import type { CSSProperties, JSX } from 'react'

import { Icon } from '@iconify/react'
import styles from './index.module.scss'
import type { IconInterface } from './types'

export function AdIcon({
  icon,
  size,
  className = '',
  style,
  adType,
  ...rest
}: IconInterface & { style?: CSSProperties }): JSX.Element | null {
  if (!icon) return null

  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const mergedStyle: CSSProperties = {
    ...(size ? { fontSize: size } : {}),
    ...style,
  }

  // Iconify set ids (e.g. mdi:email-outline, lucide:home)
  if (icon.includes(':')) {
    return (
      <Icon
        icon={icon}
        className={cx(styles['iconify-icon'], className)}
        style={mergedStyle}
        {...(adType ? { 'data-ad-type': adType } : {})}
        {...rest}
      />
    )
  }

  const iconClass = `pi pi-${icon.replace('prime:', '')}`
  const mergedClassName = cx(iconClass, styles['prime-icon'], className)

  return (
    <i
      className={mergedClassName}
      style={mergedStyle}
      {...(adType ? { 'data-ad-type': adType } : {})}
      {...rest}
    />
  )
}
