import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'
import type { InputBasePropsColorOverrides } from '@mui/material/InputBase'

export interface AdInputInterface {
  autoComplete?: string
  autoFocus?: boolean
  className?: string
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    InputBasePropsColorOverrides
  >
  components?: { Input?: React.ElementType; Root?: React.ElementType }
  componentsProps?: { input?: object; root?: object }
  defaultValue?: any
  disabled?: boolean
  disableUnderline?: boolean
  endAdornment?: React.ReactNode
  error?: boolean
  fullWidth?: boolean
  id?: string
  inputProps?: object
  inputRef?: React.Ref<any>
  margin?: 'dense' | 'none'
  maxRows?: number | string
  minRows?: number | string
  multiline?: boolean
  name?: string
  onChange?: () => void
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  rows?: number | string
  slotProps?: { input?: object; root?: object }
  slots?: { input?: React.ElementType; root?: React.ElementType }
  startAdornment?: React.ReactNode
  sx?: SxProps<Theme>
  type?: string
  value?: any
}
