import { ScrollTop } from 'primereact/scrolltop'
import type { JSX } from 'react'

import type { ScrollTopInterface } from './types'

export function AdScrollTop(props: ScrollTopInterface): JSX.Element {
  return <ScrollTop {...props} />
}
