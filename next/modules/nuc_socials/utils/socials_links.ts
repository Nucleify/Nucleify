import { useMemo } from 'react'

import { DEFAULT_SOCIAL_LINKS } from '../constants'
import type { SocialItemInterface, SocialLinkInputInterface } from '../types'

import { resolveSocial } from './resolve_social'

export function useSocialsLinks(
  getItems: () => SocialLinkInputInterface[] | undefined
): SocialItemInterface[] {
  return useMemo(
    (): SocialItemInterface[] =>
      (getItems() ?? DEFAULT_SOCIAL_LINKS)
        .filter((item) => item.url.trim().length > 0)
        .map(resolveSocial),
    [getItems]
  )
}
