export interface TabsInterface {
  lists?: TabListInterface[]
  panels?: TabPanelInterface[]
  value?: string | number
  lazy?: boolean
  scrollable?: boolean
  showNavigators?: boolean
  tabindex?: number
  selectOnFocus?: boolean
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
export interface TabListInterface {
  value?: number
  header?: string
}
export interface TabPanelInterface {
  value?: number
  content?: string
}
