import { JSX } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel'

import { AdFormControlLabelInterface } from './types'

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
