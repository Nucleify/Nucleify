import CssBaseline from '@mui/material/CssBaseline'
import type { JSX } from 'react'

import type { AdCssBaselineInterface } from './types'

export default function AdCssBaseline(
  rest: AdCssBaselineInterface
): JSX.Element {
  return <CssBaseline {...rest} />
}
