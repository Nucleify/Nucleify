import type { ResponsiveStyleValue } from '@mui/system'

export type BreakpointType = boolean | 'auto' | number

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
  xs?: BreakpointType
  sm?: BreakpointType
  md?: BreakpointType
  lg?: BreakpointType
  xl?: BreakpointType
}
