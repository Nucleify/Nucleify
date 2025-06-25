import Accordion from '@mui/material/Accordion'
import type { JSX } from 'react'

import type { AdAccordionInterface } from './types'

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
