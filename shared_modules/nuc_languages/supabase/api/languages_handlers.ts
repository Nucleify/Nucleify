import { getQuery } from 'h3'

import {
  apiError,
  apiOk,
  escapeIlike,
  fromSupabaseError,
  nowIso,
  readJsonBody,
  segId,
  segLocale,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'
import { formatRowsResponseTimestamps } from 'nuc_server'

export async function handleTranslationCategories(
  ctx: ApiContext
): Promise<ApiHandlerResult | null> {
  const locale = segLocale(ctx)!
  const { data, error } = await ctx.supabase
    .from('translations')
    .select('key')
    .eq('locale', locale)
  if (error) return fromSupabaseError(error)
  const counts = new Map<string, number>()
  for (const row of data ?? []) {
    const key = String((row as { key?: string }).key ?? '')
    if (!key) continue
    const cat = categoryPrefixFromKey(key)
    counts.set(cat, (counts.get(cat) ?? 0) + 1)
  }
  return apiOk(
    ctx,
    [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  )
}

export async function handleTranslationLocale(
  ctx: ApiContext
): Promise<ApiHandlerResult | null> {
  if (!segLocale(ctx)) return null
  const { rows, error } = await fetchTranslationsByLocale(
    ctx.supabase,
    segLocale(ctx)!
  )
  if (error) return fromSupabaseError(error)
  return apiOk(ctx, rows)
}

export async function handleTranslationBatch(
  ctx: ApiContext
): Promise<ApiHandlerResult | null> {
  const body = await readJsonBody(ctx)
  const rows = Array.isArray(body.items) ? body.items : []
  const { data, error } = await ctx.supabase
    .from('translations')
    .upsert(rows, { onConflict: 'id' })
    .select('*')
  if (error) return fromSupabaseError(error, 400)
  return apiOk(ctx, data || [])
}

export async function handleTranslationPatch(
  ctx: ApiContext
): Promise<ApiHandlerResult | null> {
  const id = segId(ctx, 1)
  if (!id) return null
  const body = await readJsonBody(ctx)
  const patch: Record<string, unknown> = { updated_at: nowIso() }
  if (
    body &&
    typeof body === 'object' &&
    !Array.isArray(body) &&
    'value' in body
  )
    patch.value = (body as Record<string, unknown>).value
  const { data, error } = await ctx.supabase
    .from('translations')
    .update(patch)
    .eq('id', id)
    .select('*')
    .maybeSingle()
  if (error) return fromSupabaseError(error)
  if (!data) return apiError(404, 'Translation not found')
  return apiOk(ctx, formatRowsResponseTimestamps([data])[0])
}

export async function handleTranslationDelete(
  ctx: ApiContext
): Promise<ApiHandlerResult | null> {
  const id = segId(ctx, 1)
  if (!id) return null
  const { error } = await ctx.supabase
    .from('translations')
    .delete()
    .eq('id', id)
  if (error) return fromSupabaseError(error)
  return apiOk(ctx, { message: 'Deleted' })
}

export async function handleTranslationList(
  ctx: ApiContext
): Promise<ApiHandlerResult | null> {
  const query = getQuery(ctx.event)
  const locale =
    String(query.locale ?? 'en')
      .trim()
      .slice(0, 16) || 'en'
  const page = Math.max(1, parseInt(String(query.page ?? '1'), 10) || 1)
  const perPage = Math.min(
    200,
    Math.max(1, parseInt(String(query.per_page ?? '100'), 10) || 100)
  )
  const category = sanitizeCategoryFilter(String(query.category ?? '').trim())
  const searchFilter = buildTranslationSearchFilter(String(query.search ?? ''))

  let q = ctx.supabase
    .from('translations')
    .select('*', { count: 'exact' })
    .eq('locale', locale)
  if (category) q = q.or(`key.eq.${category},key.ilike.${category}-%`)
  if (searchFilter) q = q.or(searchFilter)

  const from = (page - 1) * perPage
  const { data, error, count } = await q
    .order('key', { ascending: true })
    .range(from, from + perPage - 1)
  if (error) return fromSupabaseError(error)

  const total = count ?? 0
  return apiOk(ctx, {
    data: formatRowsResponseTimestamps((data ?? []) as unknown[]),
    current_page: page,
    last_page: Math.max(1, Math.ceil(total / perPage)),
    total,
  })
}

function categoryPrefixFromKey(key: string): string {
  const i = key.indexOf('-')
  return i === -1 ? key : key.slice(0, i)
}

function sanitizeCategoryFilter(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 120)
}

async function fetchTranslationsByLocale(
  supabase: ApiContext['supabase'],
  locale: string
): Promise<{
  rows: Record<string, unknown>[]
  error: { message: string } | null
}> {
  const pageSize = 1000
  const rows: Record<string, unknown>[] = []
  let from = 0
  while (true) {
    const to = from + pageSize - 1
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .eq('locale', locale)
      .order('id', { ascending: true })
      .range(from, to)
    if (error) return { rows: [], error }
    const chunk = (data ?? []) as Record<string, unknown>[]
    if (chunk.length === 0) break
    rows.push(...chunk)
    if (chunk.length < pageSize) break
    from += pageSize
  }
  return { rows, error: null }
}

function buildTranslationSearchFilter(search: string): string | null {
  const term = search.trim().slice(0, 200)
  if (!term) return null
  const esc = escapeIlike(term)
  return `key.ilike.%${esc}%,value.ilike.%${esc}%`
}
