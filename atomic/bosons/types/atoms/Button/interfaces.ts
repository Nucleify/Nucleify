import { PassThrough } from 'primevue/ts-helpers'
import { ButtonPassThroughOptions } from 'primevue/button'

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
import { Component } from 'vue'

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
  as?: string | Component
  asChild?: boolean
  link?: string
  severity?: ButtonSeverityType
  raised?: boolean
  rounded?: boolean
  text?: boolean
  outlined?: boolean
  size?: ElementSizeType
  variant?: 'outlined' | 'text' | 'link'
  fluid?: boolean
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ButtonPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
