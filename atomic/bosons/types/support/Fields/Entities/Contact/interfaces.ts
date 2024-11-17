export interface ContactFieldInterface {
  name: string
  label: string
  type: 'textarea' | 'calendar' | 'dropdown' | 'input-mask' | 'input-text'
  props?: { type: string } | { options: readonly string[]; placeholder: string }
  key?: string
}
