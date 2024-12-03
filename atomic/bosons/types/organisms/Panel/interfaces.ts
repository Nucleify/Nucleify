import { PassThrough } from 'primevue/ts-helpers'
import { PanelPassThroughOptions } from 'primevue'

export interface PanelInterface {
  panels?: PanelItemInterface[]
  header?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: object
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<PanelPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
export interface PanelItemInterface {
  content?: string
  header?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: object
}
