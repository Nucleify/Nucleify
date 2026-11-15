import type { SupabaseClient } from '@supabase/supabase-js'

export async function recordCmsActivity(
  supabase: SupabaseClient,
  input: {
    actorId?: string | null
    action: string
    entityType?: string
    entityId?: string | null
    meta?: Record<string, unknown>
  }
): Promise<void> {
  try {
    await supabase.from('cms_activity').insert({
      actor_id: input.actorId ?? null,
      action: input.action,
      entity_type: input.entityType ?? 'document',
      entity_id: input.entityId ?? null,
      meta: input.meta ?? {},
    })
  } catch {
    // Activity must never break the primary write path.
  }
}

export function buildSearchText(parts: unknown[]): string {
  const chunks: string[] = []
  const walk = (value: unknown) => {
    if (typeof value === 'string') {
      const t = value.trim()
      if (t) chunks.push(t)
      return
    }
    if (Array.isArray(value)) {
      for (const item of value) walk(item)
      return
    }
    if (value && typeof value === 'object') {
      for (const v of Object.values(value as Record<string, unknown>)) walk(v)
    }
  }
  for (const part of parts) walk(part)
  return chunks.join(' ').slice(0, 8000)
}
