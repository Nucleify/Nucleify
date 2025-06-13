import { JSX } from 'react'

import Alert from '@mui/material/Alert'

import { AdAlertInterface } from './types'

export default function AdAlert({
  children,
  className = '',
  sx,
  ...rest
}: AdAlertInterface): JSX.Element {
  return (
    <Alert className={`ad-alert ${className}`} sx={sx} {...rest}>
      {children}
    </Alert>
  )
}
