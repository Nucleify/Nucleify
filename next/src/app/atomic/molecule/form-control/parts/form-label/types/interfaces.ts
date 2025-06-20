import { SxProps, Theme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import { FormLabelPropsColorOverrides } from '@mui/material/FormLabel'

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
