import type { SxProps, Theme } from '@mui/material/styles'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export interface AdListItemInterface {
  alignItems?: 'center' | 'flex-start'
  children?: ReactNode
  className?: string
  component?: ElementType
  components?: { Root?: ElementType }
  componentsProps?: { root?: object }
  ContainerComponent?: ElementType<HTMLAttributes<HTMLDivElement>>
  ContainerProps?: object
  dense?: boolean
  disableGutters?: boolean
  disablePadding?: boolean
  divider?: boolean
  secondaryAction?: ReactNode
  slotProps?: { root?: object }
  slots?: { root?: ElementType }
  sx?: SxProps<Theme>
}
