import { PassThrough } from 'primevue/ts-helpers'
import { MenuItem } from 'primevue/menuitem'
import { ElementDirectionType } from 'atomic/bosons/types'
import { SpeedDialPassThroughOptions, SpeedDialTooltipOptions } from 'primevue'

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
  buttonClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  maskStyle?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  maskClass?: string
  showIcon?: string
  hideIcon?: string
  rotateAnimation?: boolean
  tooltipOptions?: SpeedDialTooltipOptions
  buttonProps?: object
  actionButtonProps?: object
  ariaLabel?: string
  ariaLabelledby?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<SpeedDialPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
