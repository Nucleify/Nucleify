import type { FormHelperTextPropsVariantOverrides } from '@mui/material/FormHelperText'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdFormHelperTextInterface {
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  disabled?: boolean
  error?: boolean
  filled?: boolean
  focused?: boolean
  margin?: 'dense'
  required?: boolean
  sx?: SxProps<Theme>
  variant?: OverridableStringUnion<
    'filled' | 'outlined' | 'standard',
    FormHelperTextPropsVariantOverrides
  >
}
