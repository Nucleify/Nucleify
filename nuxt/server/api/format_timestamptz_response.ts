/** Fields Supabase returns as ISO strings; dashboard expects `yyyy-mm-dd hh:mm:ss` (UTC). */
export const RESPONSE_TIMESTAMPTZ_FIELDS = ['created_at', 'updated_at'] as const

export function formatTimestamptzUtcSqlStyle(value: unknown): unknown {
  if (value === null || value === undefined) return value
  if (typeof value !== 'string') return value
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
}

export function formatRowResponseTimestamps(row: unknown): unknown {
  if (!row || typeof row !== 'object') return row
  const r = { ...(row as Record<string, unknown>) }
  for (const key of RESPONSE_TIMESTAMPTZ_FIELDS) {
    if (Object.hasOwn(r, key)) r[key] = formatTimestamptzUtcSqlStyle(r[key])
  }
  return r
}

export function formatRowsResponseTimestamps(rows: unknown[]): unknown[] {
  return rows.map(formatRowResponseTimestamps)
}
