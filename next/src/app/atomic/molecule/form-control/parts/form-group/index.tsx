import { JSX } from 'react'

import FormGroup from '@mui/material/FormGroup'

import { AdFormGroupInterface } from './types/interfaces'

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
