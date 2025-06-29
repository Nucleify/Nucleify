import AccordionSummary from '@mui/material/AccordionSummary'
import type { JSX } from 'react'

import type { AdAccordionSummaryInterface } from './types'

export default function AdAccordionSummary({
  children,
  className = '',
  sx,
  ...rest
}: AdAccordionSummaryInterface): JSX.Element {
  return (
    <AccordionSummary
      className={`ad-accordion-summary ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </AccordionSummary>
  )
}
