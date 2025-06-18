import { JSX } from 'react'

import DialogActions from '@mui/material/DialogActions'

import { AdDialogActionsInterface } from './types'

export default function AdDialogActions({
  children,
  className = '',
  sx,
  ...rest
}: AdDialogActionsInterface): JSX.Element {
  return (
    <DialogActions
      className={`ad-dialog-actions ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </DialogActions>
  )
}
