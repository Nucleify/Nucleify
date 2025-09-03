import FormGroup from '@mui/material/FormGroup'
import type { JSX } from 'react'

import type { AdFormGroupInterface } from './types/interfaces'

export default function AdFormGroup({
  children,
  className = '',
  sx,
  ...rest
}: AdFormGroupInterface): JSX.Element {
  return (
    <FormGroup className={`ad-form-group ${className}`} sx={sx} {...rest}>
      {children}
    </FormGroup>
  )
}
