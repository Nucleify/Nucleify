import Dialog from '@mui/material/Dialog'
import type { JSX } from 'react'

import type { AdDialogInterface } from './types'

export default function AdDialog({
  children,
  className = '',
  sx,
  ...rest
}: AdDialogInterface): JSX.Element {
  return (
    <Dialog className={`ad-dialog ${className}`} sx={sx} {...rest}>
      {children}
    </Dialog>
  )
}
