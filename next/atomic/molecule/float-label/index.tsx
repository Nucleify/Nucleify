import { FloatLabel } from 'primereact/floatlabel'
import type { JSX, ReactNode } from 'react'

import type { FloatLabelInterface } from './types'

export function AdFloatLabel({
  children,
  ...rest
}: FloatLabelInterface & { children?: ReactNode }): JSX.Element {
  return <FloatLabel {...rest}>{children}</FloatLabel>
}
