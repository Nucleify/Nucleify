import { Galleria } from 'primereact/galleria'
import type { JSX } from 'react'

import type { GalleriaInterface } from './types'

export function AdGalleria({
  items,
  value,
  className,
  ...rest
}: GalleriaInterface): JSX.Element {
  const images = value ?? items ?? []
  return (
    <Galleria
      {...rest}
      value={images}
      className={[className, 'ad-galleria'].filter(Boolean).join(' ')}
    />
  )
}
