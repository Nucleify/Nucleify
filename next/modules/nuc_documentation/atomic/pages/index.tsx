'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { DOC_CATEGORIES, DOC_LANGUAGES } from '../bosons/constants'
import type { DocHeadingInterface } from '../bosons/types'
import {
  getDocBasePath,
  loadDocContentClient,
  parseDocPath,
  useHeadings,
} from '../bosons/utils'
import { NucDocumentationPagination } from '../templates/pagination'
import { NucDocumentationSidebar } from '../templates/sidebar'
import { NucDocumentationToc } from '../templates/toc'

import './_index.scss'

export function NucDocumentationPage() {
  const pathname = usePathname() || ''
  const router = useRouter()

  const [content, setContent] = useState<string>('')
  const [headings, setHeadings] = useState<DocHeadingInterface[]>([])

  const contentRef = useRef<HTMLDivElement>(null)
  const { activeHeadingId, scrollToHeading, setupScrollTriggers } =
    useHeadings()

  function getDefaultDocPath(lang: string): string {
    const basePath = getDocBasePath(lang)
    return `${basePath}/${DOC_CATEGORIES[0].slug}/${DOC_CATEGORIES[0].pages[0].slug}`
  }

  function isDocsRootPath(path: string): boolean {
    return (
      path === '/docs' ||
      path === '/docs/' ||
      /^\/[a-z]{2}\/docs\/?$/.test(path)
    )
  }

  function extractLangFromPath(path: string): string {
    const match = path.match(/^\/([a-z]{2})\/docs/)
    return match ? match[1] : 'en'
  }

  function getLanguageUrl(lang: string): string {
    const pathInfo = parseDocPath(pathname)
    if (!pathInfo) return getDocBasePath(lang)

    const basePath = getDocBasePath(lang)
    return `${basePath}/${pathInfo.category}/${pathInfo.slug}`
  }

  useEffect(() => {
    if (isDocsRootPath(pathname)) {
      const lang = extractLangFromPath(pathname)
      router.replace(getDefaultDocPath(lang))
    }
  }, [pathname, router])

  async function loadContent(path: string, scrollTop = false) {
    const pathInfo = parseDocPath(path)
    if (!pathInfo) return

    try {
      const doc = await loadDocContentClient(
        pathInfo.category,
        pathInfo.slug,
        pathInfo.lang
      )

      setContent(doc.html)
      setHeadings(doc.headings)

      if (scrollTop) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    } catch (e) {
      console.error('Failed to load doc:', e)
    }
  }

  useEffect(() => {
    if (!isDocsRootPath(pathname)) {
      loadContent(pathname, true)
    }
  }, [pathname])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (content && contentRef.current) {
      timeoutId = setTimeout(() => {
        if (contentRef.current) setupScrollTriggers(contentRef.current)

        if (window.location.hash) {
          scrollToHeading(window.location.hash.slice(1))
        }
      }, 50)
    }
    return () => clearTimeout(timeoutId)
  }, [content, setupScrollTriggers, scrollToHeading])

  return (
    <div className="documentation-wrapper">
      <div className="documentation-container">
        <NucDocumentationSidebar categories={DOC_CATEGORIES} />

        {content && (
          <main className="documentation-content">
            <nav aria-hidden="true" className="prerender-links">
              {DOC_LANGUAGES.map((lang) => (
                <Link key={lang.code} href={getLanguageUrl(lang.code)}>
                  {lang.name}
                </Link>
              ))}
            </nav>
            <div
              ref={contentRef}
              className="doc-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <NucDocumentationPagination />
          </main>
        )}

        <NucDocumentationToc
          headings={headings}
          activeHeadingId={activeHeadingId ?? ''}
          onHeadingClick={scrollToHeading}
        />
      </div>

      {content && <div className="documentation-hexagons-container"></div>}
    </div>
  )
}
