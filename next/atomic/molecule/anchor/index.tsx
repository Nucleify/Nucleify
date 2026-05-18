import type { JSX, ReactNode } from 'react'

import { AdIcon, AdImage, AdLabel } from '../../atom'
import type { AnchorInterface } from './types'

export function AdAnchor({
  children,
  href,
  rel,
  target,
  style,
  icon,
  adType,
  size,
  src,
  alt,
  fetchpriority,
  label,
  anchorClass,
  itemClass,
  tooltip,
  ...rest
}: AnchorInterface & { children?: ReactNode }): JSX.Element {
  const combinedStyle = { cursor: 'pointer', ...(style ?? {}) }
  return (
    <a href={href} rel={rel} target={target} style={combinedStyle} {...rest}>
      {children}
      {icon && <AdIcon icon={icon} adType={adType} size={size} />}
      {src && <AdImage src={src} alt={alt} fetchpriority={fetchpriority} />}
      {label && <AdLabel label={label} />}
    </a>
  )
}
