export interface TabsInterface {
  lists?: TabListInterface[]
  panels?: TabPanelInterface[]
  value?: string | number
  lazy?: boolean
  scrollable?: boolean
  showNavigators?: boolean
  tabindex?: number
  selectOnFocus?: boolean
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
export interface TabListInterface {
  value: string | number
  header?: string
}
export interface TabPanelInterface {
  value: string | number
  content?: string
}
