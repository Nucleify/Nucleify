import { PassThrough } from 'primevue/ts-helpers'
import { FieldsetPassThroughOptions } from 'primevue'
import { AnchorHTMLAttributes } from 'vue'

export interface FieldsetInterface {
  legend?: string
  toggleable?: boolean
  collapsed?: boolean
  toggleButtonProps?: AnchorHTMLAttributes
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<FieldsetPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
