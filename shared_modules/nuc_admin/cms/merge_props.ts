/** Prefer CMS override when present; keep defaults for missing / empty values. */

export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function coalesceString(override: unknown, fallback: string): string {
  if (typeof override === 'string' && override.trim()) return override
  return fallback
}

export function coalesceBoolean(override: unknown, fallback: boolean): boolean {
  if (typeof override === 'boolean') return override
  return fallback
}

export function coalesceNumber(override: unknown, fallback: number): number {
  if (typeof override === 'number' && Number.isFinite(override)) return override
  return fallback
}

/** Non-empty array from CMS, else fallback. */
export function coalesceArray<T>(
  override: unknown,
  fallback: readonly T[]
): T[] {
  if (Array.isArray(override) && override.length > 0) {
    return override as T[]
  }
  return [...fallback]
}

/** Rows like `{ value: string }` → string[]; falls back when empty. */
export function coalesceStringRows(
  override: unknown,
  fallback: readonly string[]
): string[] {
  if (!Array.isArray(override) || override.length === 0) return [...fallback]
  const next = override
    .map((row) => {
      if (typeof row === 'string') return row
      if (isPlainObject(row) && typeof row.value === 'string') return row.value
      if (isPlainObject(row) && typeof row.label === 'string') return row.label
      if (isPlainObject(row) && typeof row.text === 'string') return row.text
      if (isPlainObject(row) && typeof row.command === 'string')
        return row.command
      return ''
    })
    .filter((s) => s.length > 0)
  return next.length > 0 ? next : [...fallback]
}

export function stringRows(values: readonly string[]): { value: string }[] {
  return values.map((value) => ({ value }))
}

/** Shallow merge of string fields from CMS onto a copy bag. */
export function mergeCopyBag<T extends Record<string, string>>(
  defaults: T,
  props: Record<string, unknown> | undefined | null,
  keys: (keyof T & string)[]
): T {
  const out = { ...defaults }
  if (!props) return out
  for (const key of keys) {
    const v = props[key]
    if (typeof v === 'string' && v.trim()) {
      ;(out as Record<string, string>)[key] = v
    }
  }
  return out
}

/** Read string copy keys from CMS props only (no hardcoded defaults). */
export function pickCopy(
  props: Record<string, unknown> | undefined | null,
  keys?: readonly string[] | null
): Record<string, string> {
  const out: Record<string, string> = {}
  if (!keys) return out
  for (const key of keys) {
    const v = props?.[key]
    out[key] = typeof v === 'string' ? v : ''
  }
  return out
}
