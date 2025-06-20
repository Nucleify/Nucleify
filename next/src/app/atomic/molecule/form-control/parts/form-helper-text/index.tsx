import { JSX } from 'react'

import FormHelperText from '@mui/material/FormHelperText'

import { AdFormHelperTextInterface } from './types'

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
