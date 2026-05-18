import { ProgressSpinner } from 'primereact/progressspinner'
import type { JSX } from 'react'

import type { ProgressSpinnerInterface } from './types'

export function AdProgressSpinner({
  width,
  height,
  style,
  ...rest
}: ProgressSpinnerInterface): JSX.Element {
  const mergedStyle = {
    ...(style || {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }

  return <ProgressSpinner {...rest} style={mergedStyle} />
}
