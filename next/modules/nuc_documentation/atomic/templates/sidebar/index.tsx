'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

import type { DocCategoryInterface } from '../../bosons/types'
import { getDocBasePath, parseDocPath } from '../../bosons/utils'

import './_index.scss'

export interface NucDocumentationSidebarProps {
  categories: DocCategoryInterface[]
}

export function NucDocumentationSidebar({
  categories,
}: NucDocumentationSidebarProps) {
  const pathname = usePathname()

  const pathInfo = useMemo(() => parseDocPath(pathname || ''), [pathname])
  const currentSlug = pathInfo?.slug ?? ''
  const currentLang = pathInfo?.lang ?? 'en'

  function getPageUrl(categorySlug: string, pageSlug: string): string {
    const basePath = getDocBasePath(currentLang)
    return `${basePath}/${categorySlug}/${pageSlug}`
  }

  return (
    <aside className="documentation-sidebar">
      {categories.map((category) => (
        <div key={category.slug} className="sidebar-category">
          <h3 className="category-title">{category.name}</h3>
          <ul className="category-pages">
            {category.pages.map((page) => {
              const isActive = currentSlug === page.slug
              return (
                <li key={page.slug}>
                  <Link
                    href={getPageUrl(category.slug, page.slug)}
                    className={`page-link ${isActive ? 'active' : ''}`}
                  >
                    {page.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </aside>
  )
}
