export interface EditorInterface {
  modelValue?: string
  defaultValue?: any // eslint-disable-line
  name?: string
  placeholder?: string
  readonly?: boolean
  invalid?: boolean
  formats?: any[] // eslint-disable-line
  editorStyle?: any // eslint-disable-line
  modules?: any // eslint-disable-line
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
