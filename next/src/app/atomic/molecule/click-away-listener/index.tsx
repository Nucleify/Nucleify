import { JSX } from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener'

import { AdClickAwayListenerInterface } from './types'

export default function AdClickAwayListener({
  children,
  onClickAway,
  ...rest
}: AdClickAwayListenerInterface): JSX.Element {
  return (
    <ClickAwayListener onClickAway={onClickAway} {...rest}>
      {children}
    </ClickAwayListener>
  )
}
