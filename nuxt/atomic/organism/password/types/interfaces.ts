import type { PasswordProps } from 'primevue'

export interface PasswordInterface extends /* @vue-ignore */ PasswordProps {
  id?: string
  nuiType?: NuiTypeType
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
}
