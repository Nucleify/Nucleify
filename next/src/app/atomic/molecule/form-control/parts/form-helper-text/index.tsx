import FormHelperText from '@mui/material/FormHelperText'
import type { JSX } from 'react'

import type { AdFormHelperTextInterface } from './types'

export default function AdFormHelperText({
  children,
  className = '',
  sx,
  ...rest
}: AdFormHelperTextInterface): JSX.Element {
  return (
    <FormHelperText
      className={`ad-form-helper-text ${className}`}
      sx={sx}
      {...rest}
    >
      {children}
    </FormHelperText>
  )
}
