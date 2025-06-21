import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'
import type { IconButtonPropsColorOverrides } from '@mui/material/IconButton'

export interface AdIconButtonInterface {
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
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
