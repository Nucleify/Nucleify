import { JSX } from 'react'

import AccordionDetails from '@mui/material/AccordionDetails'

import { AdAccordionDetailsInterface } from './types'

export default function AdAccordionDetails({
  children,
  className = '',
  sx,
}: AdAccordionDetailsInterface): JSX.Element {
  return (
    <AccordionDetails className={`ad-accordion-details ${className}`} sx={sx}>
      {children}
    </AccordionDetails>
  )
}
