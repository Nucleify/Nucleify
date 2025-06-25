import type { SxProps, Theme } from '@mui/material'

export type LinkColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'textPrimary'
  | 'textSecondary'
  | 'textDisabled'
  | 'inherit'

export type LinkVariantType =
  | 'inherit'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'

export interface AdLinkInterface {
  children?: React.ReactNode
  className?: string
  color?: LinkColorType
  component?: React.ElementType
  sx?: SxProps<Theme>
  TypographyClasses?: object
  underline?: 'always' | 'hover' | 'none'
  variant?: LinkVariantType
}
