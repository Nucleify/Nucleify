'use client'

import { usePathname } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import {
  NucSectionFooter,
  NucSectionNavbar,
  setActiveLocale,
  useOfficeType,
} from 'nucleify'

export default function FrontOfficeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const [isHydrated, setIsHydrated] = useState(false)
  const pathname = usePathname()
  const { officeType } = useOfficeType()
  const resolvedParams = use(params)
  const routeLang = resolvedParams?.lang || 'en'
  const pathnameLang = pathname.split('/').filter(Boolean).at(0) || routeLang
  const pageId = pathname.split('/').filter(Boolean).at(1) || 'page'

  setActiveLocale(pathnameLang)

  useEffect(() => {
    setActiveLocale(pathnameLang)
    setIsHydrated(true)
  }, [pathnameLang])

  if (!isHydrated) {
    return (
      <div id="default">
        <main id={pageId}>{children}</main>
      </div>
    )
  }

  if (officeType === 'back-office') {
    return (
      <div id="back-office">
        <main id={pageId}>{children}</main>
      </div>
    )
  }

  if (officeType === 'default') {
    return (
      <div id="default">
        <main id={pageId}>{children}</main>
      </div>
    )
  }

  return (
    <div id="front-office">
      <NucSectionNavbar />
      <main id={pageId}>{children}</main>
      <NucSectionFooter />
    </div>
  )
}
