import { JSX } from 'react'

import Dialog from '@mui/material/Dialog'

import { AdDialogInterface } from './types'

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
