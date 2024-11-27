import { PassThrough } from 'primevue/ts-helpers'
import { CardPassThroughOptions } from 'primevue/card'

export interface CardInterface {
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<CardPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
