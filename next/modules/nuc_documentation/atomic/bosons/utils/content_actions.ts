'use server'

import { promises as fs } from 'fs'
import path from 'path'

export async function readMarkdownFileAction(
  lang: string,
  category: string,
  slug: string
): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    'modules',
    'nuc_documentation',
    'content',
    lang,
    category,
    `${slug}.md`
  )

  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    throw new Error(`Failed to read markdown file on server: ${filePath}`)
  }
}
