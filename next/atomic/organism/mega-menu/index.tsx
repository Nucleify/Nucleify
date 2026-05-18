import { MegaMenu } from 'primereact/megamenu'
import type { JSX } from 'react'

import type { MegaMenuInterface } from './types'

export function AdMegaMenu({
  className,
  ...props
}: MegaMenuInterface): JSX.Element {
  return (
    <MegaMenu
      {...props}
      className={[className, 'ad-megamenu'].filter(Boolean).join(' ')}
    />
  )
}
