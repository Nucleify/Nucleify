import type { SxProps, Theme } from '@mui/material'

export interface AdCardActionsInterface {
  children: React.ReactNode
  className?: string
  disableSpacing?: boolean
  sx?: SxProps<Theme>
}
