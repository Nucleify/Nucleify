import FormControlLabel from '@mui/material/FormControlLabel'
import type { JSX } from 'react'

import type { AdFormControlLabelInterface } from './types'

export default function AdFormControlLabel({
  control,
  className = '',
  sx,
  ...rest
}: AdFormControlLabelInterface): JSX.Element {
  return (
    <FormControlLabel
      control={control}
      className={`ad-form-control-label ${className}`}
      sx={sx}
      {...rest}
    />
  )
}
