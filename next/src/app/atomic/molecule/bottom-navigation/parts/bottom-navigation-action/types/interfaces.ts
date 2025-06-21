import type { SxProps, Theme } from '@mui/material'
import type { BottomNavigationActionOwnerState } from '@mui/material/BottomNavigationAction'
import type { ButtonBaseProps } from '@mui/material/ButtonBase'
import type { SlotProps } from '@mui/material'

export interface AdBottomNavigationActionInterface {
  className?: string
  icon?: React.ReactNode
  label?: React.ReactNode
  showLabel?: boolean
  slotProps?: {
    label?: SlotProps<React.ElementType, {}, BottomNavigationActionOwnerState>
    root?: SlotProps<
      React.ElementType<ButtonBaseProps>,
      {},
      BottomNavigationActionOwnerState
    >
  }
  slots?: {
    label?: React.ElementType
    root?: React.ElementType
  }
  sx?: SxProps<Theme>
  value?: any
}
