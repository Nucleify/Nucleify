import type {
  ButtonBaseActions,
  TouchRippleActions,
} from '@mui/material/ButtonBase'

import type { SxProps, Theme } from '@mui/material'

export interface AdButtonBaseInterface {
  action?: React.Ref<ButtonBaseActions>
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
