import { PassThrough } from 'primevue/ts-helpers'
import { BlockUIPassThroughOptions } from 'primevue'

export interface BlockUIInterface {
  panels?: BlockUIPanelInterface[]
  blocked?: boolean
  fullScreen?: boolean
  baseZIndex?: number
  autoZIndex?: boolean
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<BlockUIPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
export interface BlockUIPanelInterface {
  header?: string
  content?: string
}
