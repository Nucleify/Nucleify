import type { SxProps, Theme } from '@mui/material'
import type React from 'react'
import type { TouchRippleActions } from '@mui/material/ButtonBase'

export interface AdButtonBaseInterface {
  action?: React.Ref<any>
  centerRipple?: boolean
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  disabled?: boolean
  disableRipple?: boolean
  disableTouchRipple?: boolean
  focusVisibleClassName?: string
  LinkComponent?: React.ElementType
  onFocusVisible?: () => void
  sx?: SxProps<Theme>
  TouchRippleProps?: object
  touchRippleRef?: React.Ref<TouchRippleActions>
}
