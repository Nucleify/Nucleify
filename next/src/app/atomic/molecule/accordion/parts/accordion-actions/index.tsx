import { JSX } from 'react';

import AccordionActions from '@mui/material/AccordionActions';

import { AdAccordionActionsInterface } from './types';

export default function AdAccordionActions({
    children,
    className = '',
    sx,
    ...rest
}: AdAccordionActionsInterface): JSX.Element {
  return (
    <AccordionActions className={`ad-accordion-actions ${className}`} sx={sx} {...rest}>
      {children}
    </AccordionActions>
  );
}