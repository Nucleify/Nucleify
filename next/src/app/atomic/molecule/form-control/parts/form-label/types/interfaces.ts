import type { FormLabelPropsColorOverrides } from '@mui/material/FormLabel'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdFormLabelInterface {
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning',
    FormLabelPropsColorOverrides
  >
  component?: React.ElementType
  disabled?: boolean
  error?: boolean
  filled?: boolean
  focused?: boolean
  required?: boolean
  sx?: SxProps<Theme>
}
