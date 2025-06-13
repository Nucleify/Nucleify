import { SxProps, Theme } from '@mui/material'
import { BottomNavigationActionOwnerState } from '@mui/material/BottomNavigationAction'
import { ButtonBaseProps } from '@mui/material/ButtonBase'
import { SlotProps } from '@mui/material'

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
