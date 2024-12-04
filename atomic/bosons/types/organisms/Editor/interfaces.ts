import { PassThrough } from 'primevue/ts-helpers'
import { EditorPassThroughOptions } from 'primevue/editor'

export interface EditorInterface {
  modelValue?: string
  defaultValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
  placeholder?: string
  readonly?: boolean
  invalid?: boolean
  formats?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  editorStyle?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  modules?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<EditorPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
