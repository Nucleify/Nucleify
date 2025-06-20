import { ResponsiveStyleValue } from '@mui/system'

export interface AdGridInterface {
  children?: React.ReactNode
  columns?: ResponsiveStyleValue<number>
  columnSpacing?: ResponsiveStyleValue<number | string>
  container?: boolean
  direction?: ResponsiveStyleValue<
    'row' | 'row-reverse' | 'column' | 'column-reverse'
  >
  offset?: ResponsiveStyleValue<number>
  rowSpacing?: ResponsiveStyleValue<number | string>
  spacing?: ResponsiveStyleValue<number | string>
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  xs?: boolean | 'auto' | number
  sm?: boolean | 'auto' | number
  md?: boolean | 'auto' | number
  lg?: boolean | 'auto' | number
  xl?: boolean | 'auto' | number
}
