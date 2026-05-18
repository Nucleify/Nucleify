import { AutoComplete } from 'primereact/autocomplete'
import type { JSX } from 'react'

import type { AutoCompleteInterface } from './types'

export function AdAutoComplete({
  className = '',
  ...rest
}: AutoCompleteInterface): JSX.Element {
  const mergedClassName = ['ad-autocomplete', className]
    .filter(Boolean)
    .join(' ')

  return <AutoComplete {...rest} className={mergedClassName || undefined} />
}
