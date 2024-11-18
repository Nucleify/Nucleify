export interface ContactFieldInterface {
  name: string
  label: string
  type: string
  props?: { type: string } | { options: readonly string[]; placeholder: string }
  key?: string
}
