import type { JSX } from 'react'

import type { LabelInterface } from './types'

export function AdLabel({ label, forInput }: LabelInterface): JSX.Element {
  return <label htmlFor={forInput}>{label}</label>
}
