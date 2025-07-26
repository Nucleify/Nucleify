import type { BackdropProps } from '@mui/material/Backdrop'
import type { PaperProps } from '@mui/material/Paper'
import type { TransitionProps } from '@mui/material/transitions'
import type { ElementType, JSXElementConstructor } from 'react'

import type { SxProps, Theme } from '@mui/material'

export interface AdDialogInterface {
  open: boolean
  BackdropComponent?: ElementType<BackdropProps>
  children?: React.ReactNode
  className?: string
  disableEscapeKeyDown?: boolean
  fullScreen?: boolean
  fullWidth?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  onClose?: () => void
  PaperComponent?: JSXElementConstructor<PaperProps>
  PaperProps?: object
  scroll?: 'paper' | 'body'
  slotProps?: {
    backdrop?: object
    container?: object
    paper?: object
    root?: object
    transition?: object
  }
  slots?: {
    backdrop?: React.ElementType
    container?: React.ElementType
    paper?: React.ElementType
    root?: React.ElementType
    transition?: React.ElementType
  }
  sx?: SxProps<Theme>
  TransitionComponent?: JSXElementConstructor<
    TransitionProps & { children: React.ReactElement }
  >
  transitionDuration?:
    | number
    | { appear?: number; enter?: number; exit?: number }
  TransitionProps?: object
}
