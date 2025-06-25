import type { SxProps, Theme } from '@mui/material'

export interface AdListInterface {
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  dense?: boolean
  disablePadding?: boolean
  subheader?: React.ReactNode
  sx?: SxProps<Theme>
}
