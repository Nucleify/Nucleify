import { SxProps, Theme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import {
  ButtonPropsColorOverrides,
  ButtonPropsVariantOverrides,
} from '@mui/material/Button'

export interface AdButtonInterface {
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsColorOverrides
  >
  component?: React.ElementType
  disabled?: boolean
  disableElevation?: boolean
  disableFocusRipple?: boolean
  disableRipple?: boolean
  endIcon?: React.ReactNode
  fullWidth?: boolean
  href?: string
  loading?: boolean
  loadingIndicator?: React.ReactNode
  loadingPosition?: 'center' | 'end' | 'start'
  size?: 'small' | 'medium' | 'large'
  startIcon?: React.ReactNode
  sx?: SxProps<Theme>
  variant?: OverridableStringUnion<
    'contained' | 'outlined' | 'text',
    ButtonPropsVariantOverrides
  >
}
