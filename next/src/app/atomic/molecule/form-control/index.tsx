import { JSX } from 'react'

import FormControl from '@mui/material/FormControl'

import { AdFormControlInterface } from './types'

export default function AdFormControl({
  children,
  className = '',
  sx,
  ...rest
}: AdFormControlInterface): JSX.Element {
  return (
    <FormControl className={`ad-form-control ${className}`} sx={sx} {...rest}>
      {children}
    </FormControl>
  )
}
