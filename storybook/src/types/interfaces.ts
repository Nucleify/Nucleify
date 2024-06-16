export interface ButtonInterface {
  class: string
  severity: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'
  label: string
  disabled: boolean
  raised: boolean
  rounded: boolean
  text: boolean
  outlined: boolean
  gap: string
  padding: string
}
