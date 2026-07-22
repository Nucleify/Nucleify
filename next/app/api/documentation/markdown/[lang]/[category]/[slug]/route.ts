import { readMarkdownFile } from '../../../../../../../../modules/nuc_documentation/utils/read_markdown_file.server'

type RouteContext = {
  params: Promise<{ lang: string; category: string; slug: string }>
}

export async function GET(
  _request: Request,
  context: RouteContext
): Promise<Response> {
  const { lang, category, slug } = await context.params

  try {
    const markdown = await readMarkdownFile(lang, category, slug)
    return new Response(markdown, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return new Response(
      `Documentation markdown not found: ${lang}/${category}/${slug}.md`,
      { status: 404 }
    )
  }
}
