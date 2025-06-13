import { JSX } from 'react'

import Backdrop from '@mui/material/Backdrop'

import { AdBackdropInterface } from './types'

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
