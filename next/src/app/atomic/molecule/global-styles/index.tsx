import GlobalStyles from '@mui/material/GlobalStyles'
import type { JSX } from 'react'

import type { AdGlobalStylesInterface } from './types'

export default function AdGlobalStyles({
  styles,
}: AdGlobalStylesInterface): JSX.Element {
  return <GlobalStyles styles={styles} />
}
