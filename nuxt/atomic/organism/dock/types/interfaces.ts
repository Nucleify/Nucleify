import type { DockProps } from 'primevue'

export interface DockInterface extends DockProps {}

export interface DockItemInterface {
  icon?: string
  label?: string
  url?: string
  class?: string
  adType?: string
  click?: () => void
  logo?: boolean
}
