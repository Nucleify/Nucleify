import type {
  InputBaseComponentProps,
  InputBasePropsColorOverrides,
} from '@mui/material/InputBase'
import type { ElementType, Ref } from 'react'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdInputBaseInterface {
  autoComplete?: string
  autoFocus?: boolean
  className?: string
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    InputBasePropsColorOverrides
  >
  components?: { Input?: React.ElementType; Root?: React.ElementType }
  componentsProps?: { input?: object; root?: object }
  defaultValue?: unknown
  disabled?: boolean
  disableInjectingGlobalStyles?: boolean
  endAdornment?: React.ReactNode
  error?: boolean
  fullWidth?: boolean
  id?: string
  inputComponent?: ElementType<InputBaseComponentProps>
  inputProps?: object
  inputRef?: Ref<HTMLInputElement>
  margin?: 'dense' | 'none'
  maxRows?: number | string
  minRows?: number | string
  multiline?: boolean
  name?: string
  onBlur?: () => void
  onChange?: () => void
  onInvalid?: () => void
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  rows?: number | string
  size?: 'medium' | 'small'
  slotProps?: { input?: object; root?: object }
  slots?: { input?: React.ElementType; root?: React.ElementType }
  startAdornment?: React.ReactNode
  sx?: SxProps<Theme>
  type?: string
  value?: unknown
}
