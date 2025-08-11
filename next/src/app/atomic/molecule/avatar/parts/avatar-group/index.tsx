import AvatarGroup from '@mui/material/AvatarGroup'
import type { JSX } from 'react'

import type { AdAvatarGroupInterface } from './types'

export default function AdAvatarGroup({
  className = '',
  sx,
  ...rest
}: AdAvatarGroupInterface): JSX.Element {
  return (
    <AvatarGroup className={`ad-avatar-group ${className}`} sx={sx} {...rest} />
  )
}
