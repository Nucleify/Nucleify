import type { TooltipContext } from 'primevue'

export interface TooltipInterface {
  value?: string
  disabled?: boolean
  id?: string
  class?: string
  escape?: boolean
  fitContent?: boolean
  showDelay?: number
  hideDelay?: number
  autoHide?: boolean
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
