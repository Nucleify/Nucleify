import type { SxProps, Theme } from '@mui/material/styles'

export interface AdBackdropInterface {
  open: boolean
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  components?: { Root?: React.ElementType }
  componentsProps?: { root?: object }
  invisible?: boolean
  slotProps?: {
    root?: (() => void) | object
    transition?: (() => void) | object
  }
  slots?: { root?: React.ElementType; transition?: React.ElementType }
  sx?: SxProps<Theme>
}
