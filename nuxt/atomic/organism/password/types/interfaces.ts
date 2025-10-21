import type { PasswordProps } from 'primevue'

export interface PasswordInterface extends /* @vue-ignore */ PasswordProps {
  type?: ObjectNameType
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
}
