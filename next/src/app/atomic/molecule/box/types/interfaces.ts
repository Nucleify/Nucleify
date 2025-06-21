import type { SxProps, Theme } from '@mui/material'

export interface AdBoxInterface {
  children?: React.ReactNode
  component?: React.ElementType
  sx?: SxProps<Theme>
}
