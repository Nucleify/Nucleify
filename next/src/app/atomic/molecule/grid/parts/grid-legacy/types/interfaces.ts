import type { ResponsiveStyleValue, SxProps, Theme } from '@mui/system'

export type BreakpointType = 'auto' | number | boolean

export interface AdGridLegacyInterface {
  children?: React.ReactNode
  className?: string
  columns?: ResponsiveStyleValue<number>
  columnSpacing?: ResponsiveStyleValue<number | string>
  component?: React.ElementType
  container?: boolean
  direction?: ResponsiveStyleValue<
    'row' | 'row-reverse' | 'column' | 'column-reverse'
  >
  item?: boolean
  lg?: BreakpointType
  md?: BreakpointType
  rowSpacing?: ResponsiveStyleValue<number | string>
  sm?: BreakpointType
  spacing?: ResponsiveStyleValue<number | string>
  sx?: SxProps<Theme>
  wrap?: 'nowrap' | 'wrap-reverse' | 'wrap'
  xl?: BreakpointType
  xs?: BreakpointType
  zeroMinWidth?: boolean
}
