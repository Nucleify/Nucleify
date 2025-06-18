import { SxProps, Theme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import {
  ChipPropsColorOverrides,
  ChipPropsSizeOverrides,
  ChipPropsVariantOverrides,
} from '@mui/material/Chip'

export interface AdChipInterface {
  avatar?: React.ReactElement
  className?: string
  clickable?: boolean
  color?: OverridableStringUnion<
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    ChipPropsColorOverrides
  >
  component?: React.ElementType
  deleteIcon?: React.ReactElement
  disabled?: boolean
  icon?: React.ReactElement
  label?: React.ReactNode
  onDelete?: () => void
  size?: OverridableStringUnion<'medium' | 'small', ChipPropsSizeOverrides>
  skipFocusWhenDisabled?: boolean
  slotProps?: {
    label?: object
    root?: object
  }
  slots?: {
    label?: React.ElementType
    root?: React.ElementType
  }
  sx?: SxProps<Theme>
  variant?: OverridableStringUnion<
    'filled' | 'outlined',
    ChipPropsVariantOverrides
  >
}
