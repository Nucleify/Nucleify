import { TerminalPassThroughOptions } from 'primevue/terminal'
import { PassThrough } from 'primevue/ts-helpers'

export interface TerminalInterface {
  welcomeMessage?: string
  prompt?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<TerminalPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
