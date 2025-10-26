import type { PasswordProps } from 'primevue'

export interface PasswordInterface extends /* @vue-ignore */ PasswordProps {
  id?: string
  adType?: AdTypeType
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
}
