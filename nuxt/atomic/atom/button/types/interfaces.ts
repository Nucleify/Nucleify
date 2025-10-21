import type { ButtonProps } from 'primevue'

import type { ButtonType } from 'atomic'

export interface ButtonInterface extends /* @vue-ignore */ ButtonProps {
  adType?: AdTypeType
  alt?: string
  label?: string
  icon?: string
  type?: ButtonType
  width?: string
  height?: string
  gap?: string
  padding?: string
  src?: string
}
