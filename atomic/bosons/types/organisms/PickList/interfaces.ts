import { PassThrough } from 'primevue/ts-helpers'
import { PickListPassThroughOptions } from 'primevue'

export interface PickListInterface {
  modelValue?: any[][] // eslint-disable-line @typescript-eslint/no-explicit-any
  selection?: any[][] // eslint-disable-line @typescript-eslint/no-explicit-any
  dataKey?: string
  metaKeySelection?: boolean
  autoOptionFocus?: boolean
  focusOnHover?: boolean
  listStyle?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  responsive?: boolean
  breakpoint?: string
  scrollHeight?: string
  striped?: boolean
  showSourceControls?: boolean
  showTargetControls?: boolean
  buttonProps?: object
  moveUpButtonProps?: object
  moveTopButtonProps?: object
  moveDownButtonProps?: object
  moveBottomButtonProps?: object
  moveToTargetProps?: object
  moveAllToTargetProps?: object
  moveToSourceProps?: object
  moveAllToSourceProps?: object
  tabindex?: string | number
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<PickListPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
x
