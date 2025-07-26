import type { IconButtonPropsColorOverrides } from '@mui/material/IconButton'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export type IconButtonColorType =
  | 'inherit'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'

export interface AdIconButtonInterface {
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    IconButtonColorType,
    IconButtonPropsColorOverrides
  >
  disabled?: boolean
  disableFocusRipple?: boolean
  edge?: 'end' | 'start' | false
  loading?: boolean
  loadingIndicator?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  sx?: SxProps<Theme>
}
