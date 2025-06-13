import { JSX } from 'react'

import Button from '@mui/material/Button'

import { AdButtonInterface } from './types'

export default function AdButton({
  children,
  className = '',
  sx,
  ...rest
}: AdButtonInterface): JSX.Element {
  return (
    <Button className={`ad-button ${className}`} sx={sx} {...rest}>
      {children}
    </Button>
  )
}
