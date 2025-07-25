import type { DividerPropsVariantOverrides } from '@mui/material/Divider'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdDividerInterface {
  absolute?: boolean
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  flexItem?: boolean
  light?: boolean
  orientation?: 'horizontal' | 'vertical'
  sx?: SxProps<Theme>
  textAlign?: 'left' | 'center' | 'right'
  variant?: OverridableStringUnion<
    'fullWidth' | 'inset' | 'middle',
    DividerPropsVariantOverrides
  >
}
