import type {
  BadgePropsColorOverrides,
  BadgePropsVariantOverrides,
} from '@mui/material/Badge'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdBadgeInterface {
  anchorOrigin?: {
    horizontal?: 'left' | 'right'
    vertical?: 'bottom' | 'top'
  }
  badgeContent?: React.ReactNode
  children?: React.ReactNode
  className?: string
  color?: OverridableStringUnion<
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    BadgePropsColorOverrides
  >
  component?: React.ElementType
  components?: { Badge?: React.ElementType; Root?: React.ElementType }
  componentsProps?: {
    badge?: (() => void) | object
    root?: (() => void) | object
  }
  invisible?: boolean
  max?: number
  overlap?: 'circular' | 'rectangular'
  showZero?: boolean
  slotProps?: {
    badge?: (() => void) | object
    root?: (() => void) | object
  }
  slots?: { badge?: React.ElementType; root?: React.ElementType }
  sx?: SxProps<Theme>
  variant?: OverridableStringUnion<
    'dot' | 'standard',
    BadgePropsVariantOverrides
  >
}
