import { TerminalPassThroughOptions } from 'primevue/terminal'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface TerminalInterface {
  welcomeMessage?: string
  prompt?: string
  pt?: PassThrough<TerminalPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
