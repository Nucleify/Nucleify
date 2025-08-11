import type { SxProps, Theme } from '@mui/material'

export interface AdCardInterface {
  children?: React.ReactNode
  className?: string
  raised?: boolean
  sx?: SxProps<Theme>
}
