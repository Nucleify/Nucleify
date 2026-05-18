'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import { t } from 'nucleify'

import { getNavLinks } from './links'

type NucNavbarLinksProps = {
  onCloseDrawer?: () => void
}

function getLangFromPathname(pathname: string): string {
  const [firstSegment] = pathname.split('/').filter(Boolean)
  return firstSegment || 'en'
}

export function NucNavbarLinks({
  onCloseDrawer,
}: NucNavbarLinksProps): JSX.Element {
  const pathname = usePathname()
  const lang = getLangFromPathname(pathname)
  const navLinks = getNavLinks(lang, t)

  return (
    <div className="nav-links-container">
      {navLinks.map((link) => (
        <Link
          className={
            link.isButton
              ? `p-button ${link.class || 'login-button'}`
              : 'nav-link'
          }
          href={link.href}
          key={link.label}
          onClick={onCloseDrawer}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
