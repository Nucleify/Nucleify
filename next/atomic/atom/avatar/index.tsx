import { Avatar } from 'primereact/avatar'
import type { JSX } from 'react'

import type { AvatarInterface } from './types'

export function AdAvatar(props: AvatarInterface): JSX.Element {
  return <Avatar {...props} />
}
