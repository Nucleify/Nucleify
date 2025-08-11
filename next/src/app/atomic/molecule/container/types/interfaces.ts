import type { SxProps, Theme } from '@mui/material'

export interface AdContainerInterface {
  className?: string
  component?: React.ElementType
  disableGutters?: boolean
  fixed?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  sx?: SxProps<Theme>
}
