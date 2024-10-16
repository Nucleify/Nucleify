export interface UserFieldInterface {
  name: string
  label: string
  key?: string
  type: 'input-text' | 'textarea' | 'dropdown' | 'calendar' | 'password'
  props?: {
    type?: string
    options?: Array<{ label: string; value: string }>
    placeholder?: string
  }
}
