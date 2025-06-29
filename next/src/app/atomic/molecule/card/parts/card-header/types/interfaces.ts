export interface AdCardHeaderInterface {
  action: React.ReactNode
  avatar: React.ReactNode
  className?: string
  component?: React.ElementType
  disableTypography?: boolean
  slotProps?: {
    action?: (() => void) | object
    avatar?: (() => void) | object
    content?: (() => void) | object
    root?: (() => void) | object
    subheader?: (() => void) | object
    title?: (() => void) | object
  }
  slots?: {
    action?: React.ElementType
    avatar?: React.ElementType
    content?: React.ElementType
    root?: React.ElementType
    subheader?: React.ElementType
    title?: React.ElementType
  }
  subheader?: React.ReactNode
}
