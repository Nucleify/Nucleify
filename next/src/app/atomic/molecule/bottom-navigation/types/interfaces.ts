import type { SxProps, Theme } from '@mui/material'

export interface AdBottomNavigationInterface {
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  onChange?: () => void
  showLabels?: boolean
  sx?: SxProps<Theme>
  value?: unknown
}
