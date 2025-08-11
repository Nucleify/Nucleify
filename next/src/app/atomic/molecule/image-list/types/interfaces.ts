import type { SxProps, Theme } from '@mui/material'

export interface AdImageListInterface {
  children: NonNullable<React.ReactNode>
  className?: string
  cols?: number
  component?: React.ElementType
  gap?: number
  rowHeight?: 'auto' | number
  sx?: SxProps<Theme>
  variant?: 'masonry' | 'quilted' | 'standard' | 'woven'
}
