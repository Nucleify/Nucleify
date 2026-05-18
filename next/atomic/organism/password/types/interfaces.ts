import type { PasswordProps } from 'primereact/password'

export interface PasswordInterface extends PasswordProps {
  id?: string
  adType?: AdTypeType
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
}
