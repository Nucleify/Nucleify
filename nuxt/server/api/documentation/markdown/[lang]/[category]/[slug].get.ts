import { createError, defineEventHandler, getRouterParam } from 'h3'

import { readMarkdownFile } from '../../../../../../../modules/nuc_documentation/atomic/bosons/utils/read_markdown_file.server'

export default defineEventHandler(async (event) => {
  const lang = getRouterParam(event, 'lang')
  const category = getRouterParam(event, 'category')
  const slug = getRouterParam(event, 'slug')

  if (!lang || !category || !slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing path params' })
  }

  try {
    const markdown = await readMarkdownFile(lang, category, slug)
    event.node.res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    return markdown
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: `Documentation markdown not found: ${lang}/${category}/${slug}.md`,
    })
  }
})
