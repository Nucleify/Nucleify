import Backdrop from '@mui/material/Backdrop'
import type { JSX } from 'react'

import type { AdBackdropInterface } from './types'

export default function AdBackdrop({
  children,
  className = '',
  sx,
  ...rest
}: AdBackdropInterface): JSX.Element {
  return (
    <Backdrop className={`ad-backdrop ${className}`} sx={sx} {...rest}>
      {children}
    </Backdrop>
  )
}
