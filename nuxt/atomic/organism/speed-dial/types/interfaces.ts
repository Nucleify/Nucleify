import type { SpeedDialTooltipOptions } from 'primevue'

import type { ElementDirectionType } from 'atomic'

import type { MenuItem } from 'primevue/menuitem'

export interface SpeedDialInterface {
  model?: MenuItem[]
  visible?: boolean
  direction?: ElementDirectionType
  transitionDelay?: number
  type?: 'circle' | 'linear' | 'semi-circle' | 'quarter-circle'
  radius?: number
  mask?: boolean
  disabled?: boolean
  hideOnClickOutside?: boolean
  buttonClass?: string
  maskStyle?: object
  maskClass?: string
  showIcon?: string
  hideIcon?: string
  rotateAnimation?: boolean
  tooltipOptions?: SpeedDialTooltipOptions
  buttonProps?: object
  actionButtonProps?: object
  ariaLabel?: string
  ariaLabelledby?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
