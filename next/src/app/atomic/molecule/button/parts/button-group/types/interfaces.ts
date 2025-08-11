import type {
  ButtonGroupPropsColorOverrides,
  ButtonGroupPropsSizeOverrides,
  ButtonGroupPropsVariantOverrides,
} from '@mui/material/ButtonGroup'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdButtonGroupInterface {
  children: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    ButtonGroupPropsColorOverrides
  >
  component?: React.ElementType
  disabled?: boolean
  disableElevation?: boolean
  disableFocusRipple?: boolean
  disableRipple?: boolean
  fullWidth?: boolean
  orientation?: 'horizontal' | 'vertical'
  size?: OverridableStringUnion<
    'small' | 'medium' | 'large',
    ButtonGroupPropsSizeOverrides
  >
  sx?: SxProps<Theme>
  variant?: OverridableStringUnion<
    'contained' | 'outlined' | 'text',
    ButtonGroupPropsVariantOverrides
  >
}
