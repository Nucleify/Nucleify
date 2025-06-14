export interface ColorItemStyleInterface {
  color?: string
  backgroundColor?: string
  borderColor?: string
  boxShadow?: string
  opacity?: number
}

export interface ColorItemColorsInterface {
  primary?: string
  hover?: string
  secondary?: string
}

export interface EntityColorsInterface {
  [key: string]: ColorItemColorsInterface
}

export interface UseColorsInterface {
  colors: EntityColorsInterface
}
