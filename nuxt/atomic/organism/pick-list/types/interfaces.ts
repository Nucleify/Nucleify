export interface PickListInterface {
  modelValue?: unknown[][]
  selection?: unknown[][]
  dataKey?: string
  metaKeySelection?: boolean
  autoOptionFocus?: boolean
  focusOnHover?: boolean
  listStyle?: object
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
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
