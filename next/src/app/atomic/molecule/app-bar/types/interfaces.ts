import { SxProps, Theme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import { AppBarPropsColorOverrides } from '@mui/material/AppBar'

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
