import type { SxProps, Theme } from '@mui/material'

export interface AdBreadcrumbsInterface {
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  expandText?: string
  itemsAfterCollapse?: number
  itemsBeforeCollapse?: number
  maxItems?: number
  separator?: React.ReactNode
  slotProps?: {
    collapsedIcon?: (() => void) | object
  }
  slots?: { CollapsedIcon?: React.ElementType }
  sx?: SxProps<Theme>
}
