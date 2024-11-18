export interface ContactFieldInterface {
  name: string
  label: string
  type: string
  props?: {
    options?: readonly string[]
    placeholder?: string
    type?: string
  }
  key?: string
}
