import DialogActions from '@mui/material/DialogActions'
import type { JSX } from 'react'

import type { AdDialogActionsInterface } from './types'

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
