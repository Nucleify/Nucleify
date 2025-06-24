import type { SxProps, Theme, SlotProps } from '@mui/material'
import type { BottomNavigationActionOwnerState } from '@mui/material/BottomNavigationAction'
import type { ButtonBaseProps } from '@mui/material/ButtonBase'

export interface AdBottomNavigationActionInterface {
  className?: string
  icon?: React.ReactNode
  label?: React.ReactNode
  showLabel?: boolean
  slotProps?: {
    label?: SlotProps<
      React.ElementType,
      object,
      BottomNavigationActionOwnerState
    >
    root?: SlotProps<
      React.ElementType<ButtonBaseProps>,
      object,
      BottomNavigationActionOwnerState
    >
  }
  slots?: {
    label?: React.ElementType
    root?: React.ElementType
  }
  sx?: SxProps<Theme>
  value?: unknown
}
