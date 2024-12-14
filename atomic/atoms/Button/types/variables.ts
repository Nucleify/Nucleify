import { HintedString } from 'primevue/ts-helpers'

export type ButtonBadgeSeverityType = HintedString<
  'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast'
>

export type ButtonOnClickType = (event: MouseEvent) => void

export type ButtonSeverityType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'help'
  | 'danger'

export type ButtonType = 'button' | 'reset' | 'submit'
