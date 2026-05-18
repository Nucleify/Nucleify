'use client'

import React from 'react'

import type { DocHeadingInterface } from '../../bosons/types'

import './_index.scss'

export interface DocumentationTocProps {
  headings: DocHeadingInterface[]
  activeHeadingId: string
  onHeadingClick: (id: string) => void
}

export function NucDocumentationToc({
  headings,
  activeHeadingId,
  onHeadingClick,
}: DocumentationTocProps) {
  if (!headings || headings.length === 0) {
    return null
  }

  return (
    <aside className="documentation-toc">
      <div className="toc-container">
        <h3 className="toc-title">On this page</h3>
        <nav className="toc-nav">
          <ul className="toc-list">
            {headings.map((heading) => {
              const isActive = activeHeadingId === heading.id
              return (
                <li
                  key={heading.id}
                  className={`toc-item ${isActive ? 'toc-item-active' : ''} ${heading.level === 2 ? 'toc-item-h2' : ''} ${heading.level === 3 ? 'toc-item-h3' : ''}`}
                >
                  <a
                    href={`#${heading.id}`}
                    className="toc-link"
                    onClick={(e) => {
                      e.preventDefault()
                      onHeadingClick(heading.id)
                    }}
                  >
                    {heading.text}
                  </a>
                  {heading.children && heading.children.length > 0 && (
                    <ul className="toc-sublist">
                      {heading.children.map((child) => {
                        const isChildActive = activeHeadingId === child.id
                        return (
                          <li
                            key={child.id}
                            className={`toc-item toc-item-h3 ${isChildActive ? 'toc-item-active' : ''}`}
                          >
                            <a
                              href={`#${child.id}`}
                              className="toc-link"
                              onClick={(e) => {
                                e.preventDefault()
                                onHeadingClick(child.id)
                              }}
                            >
                              {child.text}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
