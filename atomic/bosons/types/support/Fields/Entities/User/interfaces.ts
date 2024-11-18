export interface UserFieldInterface {
  name: string
  label: string
  type: string
  props?: {
    options?: readonly string[]
    placeholder?: string
    type?: string
  }
}
