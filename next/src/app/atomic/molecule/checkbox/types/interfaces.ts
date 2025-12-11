import type {
  CheckboxPropsColorOverrides,
  CheckboxPropsSizeOverrides,
} from '@mui/material/Checkbox'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdCheckNucBoxInterface {
  checked?: boolean
  checkedIcon?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    CheckboxPropsColorOverrides
  >
  defaultChecked?: boolean
  disabled?: boolean
  disableRipple?: boolean
  icon?: React.ReactNode
  id?: string
  indeterminate?: boolean
  indeterminateIcon?: React.ReactNode
  inputProps?: object
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  required?: boolean
  size?: OverridableStringUnion<'medium' | 'small', CheckboxPropsSizeOverrides>
  slotProps?: {
    input?: object
    root?: object
  }
  slots?: {
    input?: React.ElementType
    root?: React.ElementType
  }
  sx?: SxProps<Theme>
  value?: unknown
}
