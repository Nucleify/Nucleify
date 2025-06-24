import type { SxProps, Theme } from '@mui/material'
import type { FormControlLabelProps } from '@mui/material/FormControlLabel'

export interface AdFormControlLabelInterface {
  control: React.ReactElement
  checked?: boolean
  className?: string
  componentsProps?: { typography?: object }
  disabled?: boolean
  disableTypography?: boolean
  inputRef?: React.Ref<HTMLInputElement>
  label: React.ReactNode
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top'
  onChange?: () => void
  required?: boolean
  slotProps?: {
    typography?: object | ((ownerState: FormControlLabelProps) => object)
  }
  slots?: { typography?: React.ElementType }
  sx?: SxProps<Theme>
  value?: unknown
}
