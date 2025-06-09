import type { Component } from 'vue'

import type {
  AdTypeType,
  ButtonBadgeSeverityType,
  ButtonOnClickType,
  ButtonSeverityType,
  ButtonType,
  ElementSizeType,
  LoadingType,
  PositionType,
} from 'atomic'

export interface ButtonInterface {
  adType?: AdTypeType
  alt?: string
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
  link?: boolean
  severity?: ButtonSeverityType
  raised?: boolean
  rounded?: boolean
  text?: boolean
  outlined?: boolean
  size?: ElementSizeType
  variant?: 'outlined' | 'text' | 'link'
  fluid?: boolean
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  disabled?: boolean
  onclick?: ButtonOnClickType
  type?: ButtonType
  width?: string
  height?: string
  gap?: string
  padding?: string
  src?: string
}
