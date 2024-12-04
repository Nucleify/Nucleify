import { PassThrough } from 'primevue/ts-helpers'
import { TabsPassThroughOptions } from 'primevue'

export interface TabsInterface {
  lists?: TabListInterface[]
  panels?: TabPanelInterface[]
  value?: string | number
  lazy?: boolean
  scrollable?: boolean
  showNavigators?: boolean
  tabindex?: number
  selectOnFocus?: boolean
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<TabsPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
