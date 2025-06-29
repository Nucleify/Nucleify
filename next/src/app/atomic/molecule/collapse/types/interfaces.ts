import type { SxProps, Theme } from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'

export interface AdCollapseInterface {
  addEndListener?: () => void
  children: React.ReactElement
  className?: string
  collapsedSize?: string | number
  component?: React.ElementType<TransitionProps>
  easing?: { enter?: string; exit?: string } | string
  in?: boolean
  orientation?: 'horizontal' | 'vertical'
  sx?: SxProps<Theme>
  timeout?: 'auto' | number | { appear?: number; enter?: number; exit?: number }
}
