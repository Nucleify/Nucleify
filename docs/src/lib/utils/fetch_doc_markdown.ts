export function getDocMarkdownApiPath(
  lang: string,
  category: string,
  slug: string
): string {
  return `/api/docs/markdown/${lang}/${category}/${slug}`
}

export function docMarkdownNotFoundError(
  lang: string,
  category: string,
  slug: string
): string {
  return `Documentation markdown not found: ${lang}/${category}/${slug}.md`
}

export async function fetchDocMarkdownApi(
  lang: string,
  category: string,
  slug: string
): Promise<string> {
  const response = await fetch(getDocMarkdownApiPath(lang, category, slug))
  if (!response.ok) {
    throw new Error(docMarkdownNotFoundError(lang, category, slug))
  }
  return response.text()
}
