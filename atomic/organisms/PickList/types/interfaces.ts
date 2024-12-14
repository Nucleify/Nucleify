export interface PickListInterface {
  modelValue?: any[][] // eslint-disable-line
  selection?: any[][] // eslint-disable-line
  dataKey?: string
  metaKeySelection?: boolean
  autoOptionFocus?: boolean
  focusOnHover?: boolean
  listStyle?: any // eslint-disable-line
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
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
