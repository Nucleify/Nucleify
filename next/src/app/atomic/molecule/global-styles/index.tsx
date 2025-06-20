import { JSX } from 'react'

import GlobalStyles from '@mui/material/GlobalStyles'

import { AdGlobalStylesInterface } from './types'

export default function AdGlobalStyles({
  styles,
}: AdGlobalStylesInterface): JSX.Element {
  return <GlobalStyles styles={styles} />
}
