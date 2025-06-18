import { JSX } from 'react'

import DialogTitle from '@mui/material/DialogTitle'

import { AdDialogTitleInterface } from './types'

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
