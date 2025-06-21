import type { SxProps, Theme } from '@mui/material/styles'

export interface AdAvatarInterface {
  alt?: string
  children?: React.ReactNode
  className?: string
  component?: React.ElementType
  imgProps?: object
  sizes?: string
  slotProps?: {
    fallback?: (() => void) | object
    img?: (() => void) | object
    root?: (() => void) | object
  }
  slots?: {
    fallback?: React.ElementType
    img?: React.ElementType
    root?: React.ElementType
  }
  src?: string
  srcSet?: string
  sx?: SxProps<Theme>
}
