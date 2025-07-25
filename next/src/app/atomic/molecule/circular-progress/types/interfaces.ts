import type { CircularProgressPropsColorOverrides } from '@mui/material/CircularProgress'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdCircularProgressInterface {
  className?: string
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    CircularProgressPropsColorOverrides
  >
  disableShrink?: boolean
  size?: number | string
  sx?: SxProps<Theme>
  thickness?: number
  value?: number
  variant?: 'determinate' | 'indeterminate'
}
