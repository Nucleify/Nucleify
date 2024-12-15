import { MenuItem } from 'primevue/menuitem'
import { SpeedDialTooltipOptions } from 'primevue'

import { ElementDirectionType } from 'atomic'

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
  buttonClass?: any // eslint-disable-line
  maskStyle?: any // eslint-disable-line
  maskClass?: string
  showIcon?: string
  hideIcon?: string
  rotateAnimation?: boolean
  tooltipOptions?: SpeedDialTooltipOptions
  buttonProps?: object
  actionButtonProps?: object
  ariaLabel?: string
  ariaLabelledby?: string
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
