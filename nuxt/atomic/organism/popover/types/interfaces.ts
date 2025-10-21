import type { PopoverProps } from 'primevue'

export interface PopoverInterface extends PopoverProps {
  src?: string
  buttonClass?: string
  buttonStyle?: string | object
  popoverClass?: string
  icon?: string
}
