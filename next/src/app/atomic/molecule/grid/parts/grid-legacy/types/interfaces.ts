import { ResponsiveStyleValue, SxProps } from '@mui/system'
import { Theme } from '@mui/material'

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
  lg?: 'auto' | number | boolean
  md?: 'auto' | number | boolean
  rowSpacing?: ResponsiveStyleValue<number | string>
  sm?: 'auto' | number | boolean
  spacing?: ResponsiveStyleValue<number | string>
  sx?: SxProps<Theme>
  wrap?: 'nowrap' | 'wrap-reverse' | 'wrap'
  xl?: 'auto' | number | boolean
  xs?: 'auto' | number | boolean
  zeroMinWidth?: boolean
}
