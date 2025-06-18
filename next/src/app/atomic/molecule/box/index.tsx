import { JSX } from 'react'

import Box from '@mui/material/Box'

import { AdBoxInterface } from './types'

export default function AdBox({
  children,
  component = 'div',
  sx,
  ...rest
}: AdBoxInterface): JSX.Element {
  return (
    <Box component={component} sx={sx} {...rest}>
      {children}
    </Box>
  )
}
