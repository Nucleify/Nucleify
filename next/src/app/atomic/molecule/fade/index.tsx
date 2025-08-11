import Fade from '@mui/material/Fade'
import type { JSX } from 'react'

import type { AdFadeInterface } from './types'

export default function AdFade({
  children,
  ...rest
}: AdFadeInterface): JSX.Element {
  return (
    <Fade className={`ad-fade`} {...rest}>
      {children}
    </Fade>
  )
}
