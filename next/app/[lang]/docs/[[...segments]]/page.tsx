'use client'

import { NucDocumentationPage, NucGridBackground } from 'nucleify'

import 'highlight.js/styles/github-dark.css'

export default function DocsPage() {
  return (
    <div id="documentation">
      <NucGridBackground />
      <NucDocumentationPage />
    </div>
  )
}
