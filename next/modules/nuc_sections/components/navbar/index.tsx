'use client'

import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import {
  AdAnchor,
  AdButton,
  AdLogo,
  NucSectionEmailUsDialog,
  useNavbar,
} from 'nucleify'

import {
  NucNavbarDarkModeToggler,
  NucNavbarDrawer,
  NucNavbarLangSwitcher,
  NucNavbarLinks,
} from './components'
import './index.scss'

function getLangFromPathname(pathname: string): string {
  const [firstSegment] = pathname.split('/').filter(Boolean)
  return firstSegment || 'en'
}

function isDevDocsPath(pathname: string): boolean {
  return pathname.includes('/dev') || pathname.includes('/docs')
}

export function NucSectionNavbar(): JSX.Element {
  const pathname = usePathname()
  const lang = getLangFromPathname(pathname)
  const isDevPage = isDevDocsPath(pathname)
  const { navbarExpanded, toggleNavbar } = useNavbar()

  const navbarClassName = ['navbar', isDevPage ? 'navbar--dev' : '']
    .filter(Boolean)
    .join(' ')
  const homeHref = `/${lang}/${isDevPage ? 'dev' : 'home'}`

  const closeDrawer = (): void => {
    if (navbarExpanded) {
      toggleNavbar()
    }
  }

  return (
    <nav className={navbarClassName}>
      <div className="container">
        <AdAnchor
          aria-label="Home"
          className="application-header"
          href={homeHref}
        >
          <AdLogo adType="main" />
          {isDevPage ? (
            <h1 className="application-header-text">Nucleify</h1>
          ) : null}
        </AdAnchor>

        {isDevPage ? (
          <>
            <NucNavbarLinks />
            <NucNavbarLangSwitcher />
            <AdButton
              aria-label="Menu"
              className="navbar-drawer-toggler"
              icon={navbarExpanded ? undefined : 'prime:align-justify'}
              onClick={toggleNavbar}
            />
          </>
        ) : (
          <div className="navbar-actions">
            <NucNavbarDarkModeToggler />
            <NucSectionEmailUsDialog />
          </div>
        )}
      </div>

      {isDevPage ? (
        <NucNavbarDrawer onHide={closeDrawer} visible={navbarExpanded}>
          <NucNavbarLinks onCloseDrawer={closeDrawer} />
        </NucNavbarDrawer>
      ) : null}
    </nav>
  )
}
