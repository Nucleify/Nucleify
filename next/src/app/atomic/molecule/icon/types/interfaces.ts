import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'
import type {
  IconPropsColorOverrides,
  IconPropsSizeOverrides,
} from '@mui/material/Icon'

export interface AdIconInterface {
  baseClassName?: string
  children: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    IconPropsColorOverrides
  >
  component?: React.ElementType
  fontSize?: OverridableStringUnion<
    'inherit' | 'large' | 'medium' | 'small',
    IconPropsSizeOverrides
  >
  sx?: SxProps<Theme>
}
