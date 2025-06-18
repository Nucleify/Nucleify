import { JSX } from 'react'

import CssBaseline from '@mui/material/CssBaseline'

import { AdCssBaselineInterface } from './types'

export default function AdCssBaseline(
  rest: AdCssBaselineInterface
): JSX.Element {
  return <CssBaseline {...rest} />
}
