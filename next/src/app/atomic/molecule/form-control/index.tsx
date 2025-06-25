import FormControl from '@mui/material/FormControl'
import type { JSX } from 'react'

import type { AdFormControlInterface } from './types'

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
