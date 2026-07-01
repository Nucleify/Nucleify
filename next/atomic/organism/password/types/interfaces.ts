import type { PasswordProps } from 'primereact/password'

export interface PasswordInterface extends PasswordProps {
  id?: string
  nuiType?: NuiTypeType
  passwordsMatch?: boolean
  emptyPassword?: boolean
  emptyConfirmPassword?: boolean
}
