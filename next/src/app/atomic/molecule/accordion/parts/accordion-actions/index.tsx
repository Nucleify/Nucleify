import AccordionActions from '@mui/material/AccordionActions'
import type { JSX } from 'react'

import type { AdAccordionActionsInterface } from './types'

export default function AdAccordionActions({
  children,
  className = '',
  sx,
  ...rest
}: AdAccordionActionsInterface): JSX.Element {
  return (
    <AccordionActions
      className={`ad-accordion-actions ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </AccordionActions>
  )
}
