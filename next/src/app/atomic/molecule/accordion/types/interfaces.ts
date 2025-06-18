import { SxProps, Theme } from "@mui/material"
import { JSXElementConstructor } from "react"
import { TransitionProps } from "@mui/material/transitions"

export interface AdAccordionInterface {
  children: NonNullable<React.ReactNode>
  className?: string
  defaultExpanded?: boolean
  disabled?: boolean
  disableGutters?: boolean
  expanded?: boolean
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void
  slotProps?: {
    heading?: object | ((ownerState: any) => object);
    root?: object | ((ownerState: any) => object);
    transition?: object | ((ownerState: any) => object);
  }
  slots?: {
    heading?: React.ElementType;
    root?: React.ElementType;
    transition?: React.ElementType;
  }
  square?: boolean
  sx?: SxProps<Theme>
  TransitionComponent?: JSXElementConstructor<TransitionProps & { children?: React.ReactElement }>
  TransitionProps?: object
}
