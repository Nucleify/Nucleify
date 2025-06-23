import type { SxProps, Theme } from '@mui/material'

export interface AdInputAdornmentInterface {
  position: 'start' | 'end'
  children: React.ReactNode
  className?: string
  component?: React.ElementType
  disablePointerEvents?: boolean
  disableTypography?: boolean
  sx?: SxProps<Theme>
  variant?: 'filled' | 'outlined' | 'standard'
}
