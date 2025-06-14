import { SxProps, Theme } from '@mui/material'
import React from 'react'
import { TouchRippleActions } from '@mui/material/ButtonBase'

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
