import type { SxProps, Theme } from '@mui/material'

export interface AdImageListItemBarInterface {
  actionIcon?: React.ReactNode
  actionPosition?: 'left' | 'right'
  className?: string
  position?: 'below' | 'bottom' | 'top'
  subtitle?: React.ReactNode
  sx?: SxProps<Theme>
  title?: React.ReactNode
}
