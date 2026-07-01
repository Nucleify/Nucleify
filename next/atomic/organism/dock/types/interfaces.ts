import type { DockProps } from 'primereact/dock'

export interface DockInterface extends DockProps {}

export interface DockItemInterface {
  icon?: string
  label?: string
  url?: string
  class?: string
  nuiType?: string
  click?: () => void
  logo?: boolean
}
