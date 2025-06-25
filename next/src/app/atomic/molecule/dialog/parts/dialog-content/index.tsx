import DialogContent from '@mui/material/DialogContent'
import type { JSX } from 'react'

import type { AdDialogContentInterface } from './types'

export default function AdDialogContent({
  children,
  className = '',
  sx,
  ...rest
}: AdDialogContentInterface): JSX.Element {
  return (
    <DialogContent
      className={`ad-dialog-content ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </DialogContent>
  )
}
