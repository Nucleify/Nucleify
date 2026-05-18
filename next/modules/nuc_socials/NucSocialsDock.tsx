'use client'

import './_index.scss'

import { useCallback } from 'react'

import { Icon } from '@iconify/react'
import type { SocialItemInterface, SocialLinkInputInterface } from './types'
import { useSocialsLinks } from './utils'

export type { SocialItemInterface, SocialLinkInputInterface }

interface NucSocialsDockProps {
  items?: SocialLinkInputInterface[]
}

export default function NucSocialsDock({
  items,
}: NucSocialsDockProps): React.JSX.Element | null {
  const getItems = useCallback(() => items, [items])
  const links = useSocialsLinks(getItems)

  if (!links.length) {
    return null
  }

  return (
    <nav className="nuc-socials-dock" aria-label="Social media and messengers">
      {links.map((item, index) => (
        <a
          key={`${item.key}-${index}`}
          className="nuc-socials-dock-link"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
        >
          <Icon icon={item.icon} className="nuc-socials-dock-icon" />
        </a>
      ))}
    </nav>
  )
}
