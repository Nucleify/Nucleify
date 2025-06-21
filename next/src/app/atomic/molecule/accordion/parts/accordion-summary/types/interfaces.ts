import type { SxProps, Theme } from '@mui/material'

export interface AdAccordionSummaryInterface {
  children?: React.ReactNode
  className?: string
  expandIcon?: React.ReactNode
  focusVisibleClassName?: string
  slotProps?: {
    content?: (() => void) | object
    expandIconWrapper?: (() => void) | object
    root?: (() => void) | object
  }
  slots?: {
    content?: React.ElementType
    expandIconWrapper?: React.ElementType
    root?: React.ElementType
  }
  sx?: SxProps<Theme>
}
