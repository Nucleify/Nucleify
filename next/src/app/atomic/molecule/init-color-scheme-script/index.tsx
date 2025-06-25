import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import type { JSX } from 'react'

import type { AdInitColorSchemeScriptInterface } from './types'

export default function AdInitColorSchemeScript({
  ...rest
}: AdInitColorSchemeScriptInterface): JSX.Element {
  return <InitColorSchemeScript {...rest} />
}
