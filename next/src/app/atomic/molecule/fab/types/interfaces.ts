import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'
import type {
  FabPropsColorOverrides,
  FabPropsSizeOverrides,
  FabPropsVariantOverrides,
} from '@mui/material/Fab'

export interface AdFabInterface {
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    FabPropsColorOverrides
  >
  component?: React.ElementType
  disabled?: boolean
  disableFocusRipple?: boolean
  disableRipple?: boolean
  href?: string
  size?: OverridableStringUnion<
    'small' | 'medium' | 'large',
    FabPropsSizeOverrides
  >
  sx?: SxProps<Theme>
  variant?: OverridableStringUnion<
    'circular' | 'extended',
    FabPropsVariantOverrides
  >
}
