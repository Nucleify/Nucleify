import type { AppBarPropsColorOverrides } from '@mui/material/AppBar'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdAppBarInterface {
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'default'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    AppBarPropsColorOverrides
  >
  enableColorOnDark?: boolean
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'
  sx?: SxProps<Theme>
}
