import type { ButtonProps } from 'primereact/button'

import type { ButtonMedia, ButtonType, ButtonVariant } from './variables'

export interface ButtonInterface extends ButtonProps {
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
