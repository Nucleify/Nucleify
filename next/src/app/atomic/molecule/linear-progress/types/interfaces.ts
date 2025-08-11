import type { LinearProgressPropsColorOverrides } from '@mui/material/LinearProgress'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdLinearProgressInterface {
  className?: string
  color?: OverridableStringUnion<
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit',
    LinearProgressPropsColorOverrides
  >
  sx?: SxProps<Theme>
  value?: number
  valueBuffer?: number
  variant?: 'buffer' | 'determinate' | 'indeterminate' | 'query'
}
