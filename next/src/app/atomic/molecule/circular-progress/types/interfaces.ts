import { SxProps, Theme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import { CircularProgressPropsColorOverrides } from '@mui/material/CircularProgress'

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
