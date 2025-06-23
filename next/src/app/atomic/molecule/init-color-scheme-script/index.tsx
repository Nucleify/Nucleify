import { JSX } from 'react'

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

import { AdInitColorSchemeScriptInterface } from './types'

export default function AdInitColorSchemeScript({
  ...rest
}: AdInitColorSchemeScriptInterface): JSX.Element {
  return <InitColorSchemeScript {...rest} />
}
