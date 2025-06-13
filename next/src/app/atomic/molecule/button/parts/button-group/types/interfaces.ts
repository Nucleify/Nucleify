import { SxProps, Theme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import {
  ButtonGroupPropsColorOverrides,
  ButtonGroupPropsSizeOverrides,
  ButtonGroupPropsVariantOverrides,
} from '@mui/material/ButtonGroup'

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
