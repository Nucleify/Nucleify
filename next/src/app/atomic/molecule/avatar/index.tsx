import Avatar from '@mui/material/Avatar'
import type { JSX } from 'react'

import type { AdAvatarInterface } from './types'

export default function AdAvatar({
  className = '',
  sx,
  ...rest
}: AdAvatarInterface): JSX.Element {
  return <Avatar className={`ad-avatar ${className}`} sx={sx} {...rest} />
}
