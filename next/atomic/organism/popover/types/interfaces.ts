import type { OverlayPanelProps } from 'primereact/overlaypanel'

export interface PopoverInterface extends OverlayPanelProps {
  position?: PositionType
  src?: string
  buttonClass?: string
  buttonStyle?: string | object
  buttonText?: string
  popoverClass?: string
  icon?: string
}
