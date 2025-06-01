export interface EditorInterface {
  modelValue?: string
  defaultValue?: unknown
  name?: string
  placeholder?: string
  readonly?: boolean
  invalid?: boolean
  formats?: unknown[]
  editorStyle?: object
  modules?: object
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
