import type {
  AlertPropsColorOverrides,
  AlertPropsVariantOverrides,
} from '@mui/material/Alert'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdAlertInterface {
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  closeText?: string
  color?: OverridableStringUnion<
    'success' | 'info' | 'warning' | 'error',
    AlertPropsColorOverrides
  >
  components?: {
    CloseButton?: React.ElementType
    CloseIcon?: React.ElementType
  }
  componentsProps?: {
    closeButton?: object
    closeIcon?: object
  }
  icon?: React.ReactNode
  iconMapping?: {
    error?: React.ReactNode
    info?: React.ReactNode
    success?: React.ReactNode
    warning?: React.ReactNode
  }
  onClose?: () => void
  role?: string
  severity?: OverridableStringUnion<
    'success' | 'info' | 'warning' | 'error',
    AlertPropsColorOverrides
  >
  slotProps?: {
    action?: (() => void) | object
    closeButton?: (() => void) | object
    closeIcon?: (() => void) | object
    icon?: (() => void) | object
    message?: (() => void) | object
    root?: (() => void) | object
  }
  slots?: {
    action?: React.ElementType
    closeButton?: React.ElementType
    closeIcon?: React.ElementType
    icon?: React.ElementType
    message?: React.ElementType
    root?: React.ElementType
  }
  sx?: SxProps<Theme>
  variant?: OverridableStringUnion<
    'standard' | 'filled' | 'outlined',
    AlertPropsVariantOverrides
  >
}
