import type { AvatarGroupPropsVariantOverrides } from '@mui/material/AvatarGroup'

import type { SxProps, Theme } from '@mui/material'
import type { OverridableStringUnion } from '@mui/types'

export interface AdAvatarGroupInterface {
  children: React.ReactNode
  className?: string
  component?: React.ElementType // not optional
  componentsProps?: { additionalAvatar?: object }
  max?: number
  renderSurplus?: (surplus: number) => React.ReactNode
  slotProps?: {
    additionalAvatar?: object
    surplus?: (() => void) | object
  }
  slots?: { surplus?: React.ElementType }
  spacing: 'medium' | 'small' | number
  sx?: SxProps<Theme>
  total?: number
  variant?: OverridableStringUnion<
    'circular' | 'rounded' | 'square',
    AvatarGroupPropsVariantOverrides
  >
}
