import type { SxProps, Theme } from '@mui/material'

type GenericSlotProps =
  | Record<string, unknown>
  | ((ownerState: unknown) => Record<string, unknown>)

export interface AdCardActionAreaInterface {
  children?: React.ReactNode
  className?: string
  slotProps?: {
    focusHighlight?: GenericSlotProps
    root?: GenericSlotProps
  }
  slots?: {
    focusHighlight?: React.ElementType
    root?: React.ElementType
  }
  sx?: SxProps<Theme>
}
