import type { SxProps, Theme } from '@mui/material'

export interface AdInputLabelInterface {
  children?: React.ReactNode
  className?: string
  color?: 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning'
  disableAnimation?: boolean
  disabled?: boolean
  error?: boolean
  focused?: boolean
  margin?: 'dense'
  required?: boolean
  shrink?: boolean
  size?: 'medium' | 'small'
  sx?: SxProps<Theme>
  variant?: 'filled' | 'outlined' | 'standard'
}
