import type { FormControlPropsColorOverrides } from '@mui/material/FormControl'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdFormControlInterface {
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    FormControlPropsColorOverrides
  >
  component?: React.ElementType
  disabled?: boolean
  error?: boolean
  focused?: boolean
  fullWidth?: boolean
  hiddenLabel?: boolean
  margin?: 'dense' | 'none' | 'normal'
  required?: boolean
  size?: 'medium' | 'small'
  sx?: SxProps<Theme>
  variant?: 'filled' | 'outlined' | 'standard'
}
