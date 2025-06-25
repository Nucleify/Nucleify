import type { SxProps, Theme } from '@mui/material'

export interface AdCardContentInterface {
  children: React.ReactNode
  className?: string
  component?: React.ElementType
  sx?: SxProps<Theme>
}
