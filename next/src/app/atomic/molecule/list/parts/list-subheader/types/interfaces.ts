import type { SxProps, Theme } from '@mui/material/styles'

export interface AdListSubheaderInterface {
  children?: React.ReactNode
  className?: string
  color?: 'default' | 'inherit' | 'primary'
  component?: React.ElementType
  disableGutters?: boolean
  disableSticky?: boolean
  inset?: boolean
  sx?: SxProps<Theme>
}
