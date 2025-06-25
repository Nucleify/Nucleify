import type { SxProps, Theme } from '@mui/material'

export interface AdImageListItemInterface {
  children?: React.ReactNode
  className?: string
  cols?: number
  component?: React.ElementType
  rows?: number
  sx?: SxProps<Theme>
}
