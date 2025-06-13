import { JSX } from 'react'

import Accordion from '@mui/material/Accordion'

import { AdAccordionInterface } from './types'

export default function AdAccordion({
  children,
  className = '',
  sx,
  ...rest
}: AdAccordionInterface): JSX.Element {
  return (
    <Accordion className={`ad-accordion ${className}`} sx={sx} {...rest}>
      {children}
    </Accordion>
  )
}
