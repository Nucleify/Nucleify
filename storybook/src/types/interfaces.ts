export interface ButtonInterface {
  severity:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'help'
    | 'danger'
  label: string
  disabled: boolean
  raised: boolean
  rounded: boolean
  text: boolean
  outlined: boolean
}
