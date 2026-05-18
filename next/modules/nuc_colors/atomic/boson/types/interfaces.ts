export interface ColorItemStyleInterface {
  color?: string
  backgroundColor?: string
  borderColor?: string
  boxShadow?: string
  opacity?: number
}

export interface ColorItemInterface {
  primary?: string
  hover?: string
  secondary?: string
}

export interface EntityColorsInterface {
  [key: string]: ColorItemInterface
}

export interface UseColorsInterface {
  colors: EntityColorsInterface
}
