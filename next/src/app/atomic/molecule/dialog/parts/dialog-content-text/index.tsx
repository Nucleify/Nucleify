import DialogContentText from '@mui/material/DialogContentText'
import type { JSX } from 'react'

import type { AdDialogContentTextInterface } from './types'

export default function AdDialogContentText({
  children,
  className = '',
  sx,
}: AdDialogContentTextInterface): JSX.Element {
  return (
    <DialogContentText
      className={`ad-dialog-content-text ${className}`}
      sx={sx}
    >
      {children}
    </DialogContentText>
  )
}
