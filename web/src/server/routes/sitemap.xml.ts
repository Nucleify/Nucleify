import { defineEventHandler, getQuery, setHeader } from 'h3'

/**
 * XML sitemap from published CMS pages + posts.
 */
export default defineEventHandler(async (event) => {
  const locale = String(getQuery(event).locale ?? 'en').trim() || 'en'
  const origin =
    process.env.NUXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://nucleify.io'

  let urls: { path: string; updated_at?: string }[] = []
  try {
    const body = await $fetch<{
      data?: { urls?: { path: string; updated_at?: string }[] }
    }>(`/api/public/sitemap`, { query: { locale } })
    urls = body?.data?.urls ?? []
  } catch {
    urls = [
      { path: `/${locale}/home` },
      { path: `/${locale}/investor` },
      { path: `/${locale}/blog` },
    ]
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const loc = `${origin.replace(/\/$/, '')}${u.path}`
    const lastmod = u.updated_at
      ? `<lastmod>${new Date(u.updated_at).toISOString()}</lastmod>`
      : ''
    return `  <url><loc>${loc}</loc>${lastmod}</url>`
  })
  .join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
