import AlertTitle from '@mui/material/AlertTitle'
import type { JSX } from 'react'

import type { AdAlertTitleInterface } from './types'

export default function AdAlertTitle({
  children,
  className = '',
  sx,
}: AdAlertTitleInterface): JSX.Element {
  return (
    <AlertTitle className={`ad-alert-title ${className}`} sx={sx}>
      {children}
    </AlertTitle>
  )
}
