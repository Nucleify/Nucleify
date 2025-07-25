import type { ListItemTextOwnerState } from '@mui/material/ListItemText'
import type { TypographyProps } from '@mui/material/Typography'

import type { SlotProps, SxProps, Theme } from '@mui/material'

export interface AdListItemTextInterface {
  children?: React.ReactNode
  className?: string
  disableTypography?: boolean
  inset?: boolean
  primary?: React.ReactNode
  primaryTypographyProps?: Partial<TypographyProps>
  secondary?: React.ReactNode
  secondaryTypographyProps?: Partial<TypographyProps>
  slotProps?: {
    root?: SlotProps<'div', object, ListItemTextOwnerState>
    primary?: SlotProps<
      React.ElementType<TypographyProps>,
      object,
      ListItemTextOwnerState
    >
    secondary?: SlotProps<
      React.ElementType<TypographyProps>,
      object,
      ListItemTextOwnerState
    >
  }
  slots?: {
    root?: React.ElementType
    primary?: React.ElementType
    secondary?: React.ElementType
  }
  sx?: SxProps<Theme>
}
