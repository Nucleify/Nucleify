import type Accordion from '@mui/material/Accordion'
import type { TransitionProps } from '@mui/material/transitions'
import type { JSXElementConstructor } from 'react'

import type { SxProps, Theme } from '@mui/material'

type AccordionOwnerState = React.ComponentProps<typeof Accordion>

export interface AdAccordionInterface {
  children: NonNullable<React.ReactNode>
  className?: string
  defaultExpanded?: boolean
  disabled?: boolean
  disableGutters?: boolean
  expanded?: boolean
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void
  slotProps?: {
    heading?: object | ((ownerState: AccordionOwnerState) => object)
    root?: object | ((ownerState: AccordionOwnerState) => object)
    transition?: object | ((ownerState: AccordionOwnerState) => object)
  }
  slots?: {
    heading?: React.ElementType
    root?: React.ElementType
    transition?: React.ElementType
  }
  square?: boolean
  sx?: SxProps<Theme>
  TransitionComponent?: JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement }
  >
  TransitionProps?: object
}
