import type { SxProps, Theme } from '@mui/material'

export interface AdCardMediaInterface {
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  image?: string
  srcSet?: string
  sx?: SxProps<Theme>
}
