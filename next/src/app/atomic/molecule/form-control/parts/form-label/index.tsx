import FormLabel from '@mui/material/FormLabel'
import type { JSX } from 'react'

import type { AdFormLabelInterface } from './types'

export default function AdFormLabel({
  children,
  className = '',
  sx,
  ...rest
}: AdFormLabelInterface): JSX.Element {
  return (
    <FormLabel className={`ad-form-label ${className}`} sx={sx} {...rest}>
      {children}
    </FormLabel>
  )
}
