import { Icon } from '@iconify/react'
import type { CSSProperties, JSX } from 'react'

import styles from './index.module.scss'
import type { IconInterface } from './types'

export function AdIcon({
  icon,
  size,
  className = '',
  style,
  nuiType,
  ...rest
}: IconInterface & { style?: CSSProperties }): JSX.Element | null {
  if (!icon) return null

  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const mergedStyle: CSSProperties = {
    ...(size ? { fontSize: size } : {}),
    ...style,
  }

  if (icon.startsWith('prime:')) {
    const iconClass = `pi pi-${icon.slice(6)}`
    const mergedClassName = cx(iconClass, styles['prime-icon'], className)

    return (
      <i
        className={mergedClassName}
        style={mergedStyle}
        {...(nuiType ? { 'data-nui-type': nuiType } : {})}
        {...rest}
      />
    )
  }

  // Iconify set ids (e.g. mdi:email-outline, lucide:home)
  if (icon.includes(':')) {
    return (
      <Icon
        icon={icon}
        className={cx(styles['iconify-icon'], className)}
        style={mergedStyle}
        {...(nuiType ? { 'data-nui-type': nuiType } : {})}
        {...rest}
      />
    )
  }

  const iconClass = `pi pi-${icon}`
  const mergedClassName = cx(iconClass, styles['prime-icon'], className)

  return (
    <i
      className={mergedClassName}
      style={mergedStyle}
      {...(nuiType ? { 'data-nui-type': nuiType } : {})}
      {...rest}
    />
  )
}
