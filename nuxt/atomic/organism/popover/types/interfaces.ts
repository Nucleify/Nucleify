import type { PopoverProps } from 'primevue'

import type { PositionType } from 'nucleify'
export interface PopoverInterface extends PopoverProps {
  position?: PositionType
  src?: string
  buttonClass?: string
  buttonStyle?: string | object
  buttonText?: string
  popoverClass?: string
  icon?: string
}
