import type { ButtonProps } from 'primevue'

import type { ButtonMedia, ButtonType, ButtonVariant } from 'nucleify'

export interface ButtonInterface extends /* @vue-ignore */ ButtonProps {
  adType?: AdTypeType
  media?: ButtonMedia
  variant?: ButtonVariant
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
