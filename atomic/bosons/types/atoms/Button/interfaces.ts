import { PassThrough } from 'primevue/ts-helpers'
import { ButtonPassThroughOptions } from 'primevue/button'
import { PassThroughOptions } from 'primevue/passthrough'

import {
  AdTypeType,
  ButtonBadgeSeverityType,
  ButtonOnClickType,
  ButtonSeverityType,
  ButtonType,
  ElementSizeType,
  LoadingType,
  PositionType,
} from 'atomic/bosons/types'

export interface ButtonInterface {
  adType?: AdTypeType
  label?: string
  icon?: string
  iconPos?: PositionType
  iconClass?: string
  badge?: string
  badgeClass?: string
  badgeSeverity?: ButtonBadgeSeverityType
  loading?: LoadingType
  loadingIcon?: string
  link?: string
  severity?: ButtonSeverityType
  raised?: boolean
  rounded?: boolean
  text?: boolean
  outlined?: boolean
  size?: ElementSizeType
  plain?: string
  pt?: PassThrough<ButtonPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: string
  disabled?: boolean
  onclick?: ButtonOnClickType
  type?: ButtonType
  width?: string
  height?: string
  gap?: string
  padding?: string
  src?: string
}
