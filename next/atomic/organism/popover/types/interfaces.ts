import type { OverlayPanelProps } from 'primereact/overlaypanel'
import type { MouseEvent, ReactNode } from 'react'

export interface PopoverInterface extends OverlayPanelProps {
  position?: PositionType
  src?: string
  buttonClass?: string
  buttonStyle?: string | object
  buttonText?: string
  popoverClass?: string
  icon?: string
  renderTrigger?: (toggle: (event: MouseEvent) => void) => ReactNode
}
