import { PassThrough } from 'primevue/ts-helpers'
import { PanelPassThroughOptions } from 'primevue'

export interface PanelInterface {
  header?: string
  content?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: object
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<PanelPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
