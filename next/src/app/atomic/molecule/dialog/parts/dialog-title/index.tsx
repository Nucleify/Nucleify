import DialogTitle from '@mui/material/DialogTitle'
import type { JSX } from 'react'

import type { AdDialogTitleInterface } from './types'

export default function AdDialogTitle({
  children,
  className = '',
  sx,
}: AdDialogTitleInterface): JSX.Element {
  return (
    <DialogTitle className={`ad-dialog-title ${className}`} sx={sx}>
      {children}
    </DialogTitle>
  )
}
