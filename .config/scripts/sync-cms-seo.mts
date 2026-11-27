/**
 * Patch canonical marketing pages' `data.seo` from product defaults (no section wipe).
 * Run: pnpm exec vite-node --config vitest.config.ts .config/scripts/sync-cms-seo.mts
 */
import { createClient } from '@supabase/supabase-js'

import {
  DEFAULT_COMPANY_SECTIONS,
  DEFAULT_HOME_SECTIONS,
  DEFAULT_INVESTOR_SECTIONS,
  DEFAULT_THANK_YOU_SECTIONS,
  defaultSeoForSlug,
} from '../../shared_modules/nuc_cms/cms/default_pages'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required')
}

const sb = createClient(url, key)

const pages = [
  { slug: 'home', title: 'Home', sections: DEFAULT_HOME_SECTIONS },
  { slug: 'investor', title: 'Investor', sections: DEFAULT_INVESTOR_SECTIONS },
  {
    slug: 'migrations-company',
    title: 'Migrations company',
    sections: DEFAULT_COMPANY_SECTIONS,
  },
  {
    slug: 'thank-you',
    title: 'Thank you',
    sections: DEFAULT_THANK_YOU_SECTIONS,
  },
] as const

for (const page of pages) {
  const seo = defaultSeoForSlug(page.slug)
  if (!seo) continue

  const { data: existing, error: readErr } = await sb
    .from('cms_documents')
    .select('id, data')
    .eq('collection_slug', 'pages')
    .eq('slug', page.slug)
    .eq('locale', 'en')
    .maybeSingle()
  if (readErr) throw readErr

  if (existing) {
    const data = {
      ...((existing.data as Record<string, unknown>) || {}),
      seo,
    }
    const { error } = await sb
      .from('cms_documents')
      .update({ data, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) throw error
    console.log('updated seo', page.slug)
  } else {
    const { error } = await sb.from('cms_documents').insert({
      collection_slug: 'pages',
      locale: 'en',
      title: page.title,
      slug: page.slug,
      status: 'published',
      published_at: new Date().toISOString(),
      data: { version: 1, sections: page.sections, seo },
    })
    if (error) throw error
    console.log('inserted', page.slug)
  }
}

const { data: check, error: checkErr } = await sb
  .from('cms_documents')
  .select('slug, data')
  .eq('collection_slug', 'pages')
  .in(
    'slug',
    pages.map((p) => p.slug)
  )
  .eq('locale', 'en')
if (checkErr) throw checkErr
for (const row of check || []) {
  const seo = (row.data as { seo?: unknown })?.seo
  console.log(row.slug, JSON.stringify(seo))
}
