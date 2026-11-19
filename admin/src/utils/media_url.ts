export function mediaPublicUrl(
  row: {
    public_url?: string | null
    storage_path?: string | null
  },
  supabaseUrl = ''
): string {
  const direct = String(row.public_url || '').trim()
  if (direct) return direct
  const path = String(row.storage_path || '').trim()
  if (!path) return ''
  const base = String(supabaseUrl || '').replace(/\/$/, '')
  if (base) return `${base}/storage/v1/object/public/cms-media/${path}`
  return `/storage/v1/object/public/cms-media/${path}`
}

export function isMediaUrl(value: string): boolean {
  const v = value.trim()
  if (!v) return false
  return (
    /^https?:\/\//i.test(v) ||
    v.startsWith('/') ||
    v.startsWith('data:image/')
  )
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isMediaId(value: string): boolean {
  return UUID_RE.test(value.trim())
}
