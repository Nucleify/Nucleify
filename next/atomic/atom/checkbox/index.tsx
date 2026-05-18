import { Checkbox } from 'primereact/checkbox'
import type { JSX } from 'react'

import type { CheckboxInterface } from './types'

export function AdCheckbox({
  adType,
  className = '',
  pt: userPt,
  ...rest
}: CheckboxInterface): JSX.Element {
  const userRoot = userPt?.root

  const pt = {
    ...userPt,
    root:
      typeof userRoot === 'function'
        ? userRoot
        : {
            ...(userRoot ?? {}),
            className: [className, userRoot?.className]
              .filter(Boolean)
              .join(' '),
            ...(adType ? { 'ad-type': adType } : {}),
          },
  }

  return <Checkbox {...rest} pt={pt} />
}
