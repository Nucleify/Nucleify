import type { JSX } from 'react'

import type { HeadingInterface } from './types'
import { chooseHeading } from './utils'

export function AdHeading({
  tag,
  text,
  children,
}: HeadingInterface): JSX.Element {
  const Tag = chooseHeading(tag)

  return (
    <Tag>
      {text}
      {children}
    </Tag>
  )
}
