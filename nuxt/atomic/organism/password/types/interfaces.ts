import type { PasswordProps } from 'primevue'

export interface PasswordInterface extends /* @vue-ignore */ PasswordProps {
  id?: string
  type?: ObjectNameType
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
}
