import { ProgressBar } from 'primereact/progressbar'
import type { JSX } from 'react'

import type { ProgressBarInterface } from './types'

export function AdProgressBar({
  width,
  height,
  style,
  ...rest
}: ProgressBarInterface): JSX.Element {
  const mergedStyle = {
    ...(style || {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  }

  return <ProgressBar {...rest} style={mergedStyle} />
}
