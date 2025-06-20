import { JSX } from 'react'

import Fade from '@mui/material/Fade'

import { AdFadeInterface } from './types'

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
