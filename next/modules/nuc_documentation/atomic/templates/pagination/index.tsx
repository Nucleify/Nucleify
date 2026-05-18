'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

import { DOC_CATEGORIES } from '../../bosons/constants'
import { getDocBasePath, parseDocPath } from '../../bosons/utils'

import './_index.scss'

interface PaginationPage {
  category: string
  slug: string
  title: string
}

export function NucDocumentationPagination() {
  const pathname = usePathname()

  const pathInfo = useMemo(() => parseDocPath(pathname || ''), [pathname])
  const currentLang = pathInfo?.lang ?? 'en'

  const flatPages = useMemo<PaginationPage[]>(() => {
    const pages: PaginationPage[] = []
    DOC_CATEGORIES.forEach((category) => {
      category.pages.forEach((page) => {
        pages.push({
          category: category.slug,
          slug: page.slug,
          title: page.title,
        })
      })
    })
    return pages
  }, [])

  const currentIndex = useMemo(() => {
    if (!pathInfo) return -1
    return flatPages.findIndex(
      (p) => p.category === pathInfo.category && p.slug === pathInfo.slug
    )
  }, [pathInfo, flatPages])

  const paginationItems = useMemo(() => {
    return [
      {
        type: 'prev',
        label: 'Previous',
        page: currentIndex > 0 ? flatPages[currentIndex - 1] : null,
      },
      {
        type: 'next',
        label: 'Next',
        page:
          currentIndex >= 0 && currentIndex < flatPages.length - 1
            ? flatPages[currentIndex + 1]
            : null,
      },
    ]
  }, [currentIndex, flatPages])

  function getPageUrl(categorySlug: string, pageSlug: string): string {
    const basePath = getDocBasePath(currentLang)
    return `${basePath}/${categorySlug}/${pageSlug}`
  }

  return (
    <nav className="documentation-pagination">
      {paginationItems.map((item) => (
        <React.Fragment key={item.type}>
          {item.page ? (
            <Link
              href={getPageUrl(item.page.category, item.page.slug)}
              className={`pagination-link ${item.type}`}
            >
              <span className="pagination-label">{item.label}</span>
              <span className="pagination-title">
                {item.type === 'prev' && (
                  <span className="pagination-arrow">←</span>
                )}
                {item.page.title}
                {item.type === 'next' && (
                  <span className="pagination-arrow">→</span>
                )}
              </span>
            </Link>
          ) : (
            <div className="pagination-placeholder" />
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
