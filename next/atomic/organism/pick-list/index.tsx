import { PickList } from 'primereact/picklist'
import type { JSX } from 'react'

import type { PickListInterface } from './types'

export function AdPickList({
  className,
  ...props
}: PickListInterface): JSX.Element {
  return (
    <PickList
      {...props}
      className={[className, 'ad-picklist'].filter(Boolean).join(' ')}
    />
  )
}
