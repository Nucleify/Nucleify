import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getBundledMarkdown } from './markdown_bundle.generated'

import { existsSync } from 'node:fs'

function resolveContentDir(): string {
  const fromPackage = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    'content'
  )

  if (existsSync(fromPackage)) {
    return fromPackage
  }

  const fromCwd = resolve(process.cwd(), 'content')
  if (existsSync(fromCwd)) {
    return fromCwd
  }

  return fromPackage
}

export async function readMarkdownFile(
  lang: string,
  category: string,
  slug: string
): Promise<string> {
  const bundled = getBundledMarkdown(lang, category, slug)
  if (bundled !== null) {
    return bundled
  }

  const contentDir = resolveContentDir()
  const filePath = join(contentDir, lang, category, `${slug}.md`)
  return readFile(filePath, 'utf-8')
}
