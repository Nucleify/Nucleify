/** Prefer CMS string when the key is present (including ""); missing keys keep defaults. */

export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function coalesceString(override: unknown, fallback: string): string {
  if (typeof override === 'string' && override.trim()) return override
  return fallback
}

/** Shallow string-field merge for CMS object bags (glance, etc.). */
export function coalesceStringFields<T extends Record<string, string>>(
  override: unknown,
  fallback: T
): T {
  if (!isPlainObject(override)) return { ...fallback }
  const out = { ...fallback }
  for (const key of Object.keys(fallback) as Array<keyof T & string>) {
    out[key] = coalesceString(override[key], fallback[key]!) as T[typeof key]
  }
  return out
}

export function coalesceBoolean(override: unknown, fallback: boolean): boolean {
  if (typeof override === 'boolean') return override
  return fallback
}

/** Per-viewport show/hide knobs (mobile < md, tablet md–lg, desktop ≥ lg). */
export type BreakpointVisibility = {
  mobile: boolean
  tablet: boolean
  desktop: boolean
}

/**
 * Resolve CMS breakpoint visibility.
 * Legacy `true` → `fallback`; legacy `false` → all off; missing keys keep `fallback`.
 */
export function coalesceBreakpointVisibility(
  override: unknown,
  fallback: BreakpointVisibility
): BreakpointVisibility {
  if (override === true) return { ...fallback }
  if (override === false) {
    return { mobile: false, tablet: false, desktop: false }
  }
  if (!isPlainObject(override)) return { ...fallback }
  return {
    mobile: coalesceBoolean(override.mobile, fallback.mobile),
    tablet: coalesceBoolean(override.tablet, fallback.tablet),
    desktop: coalesceBoolean(override.desktop, fallback.desktop),
  }
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
    // Present string wins — including "" so CMS can intentionally blank a field.
    if (typeof v === 'string') {
      ;(out as Record<string, string>)[key] = v
    }
  }
  return out
}

/**
 * Prefer a single multiline title from CMS; else join legacy lead/trail fields
 * with a newline so Enter in one textarea drives line breaks.
 */
export function coalesceTitleLines(
  props: Record<string, unknown> | undefined | null,
  key: string,
  leadKey: string,
  trailKey: string,
  fallback: string
): string {
  const unified = props?.[key]
  if (typeof unified === 'string' && unified.length > 0) return unified
  const lead = props?.[leadKey]
  const trail = props?.[trailKey]
  const parts = [lead, trail].filter(
    (s): s is string => typeof s === 'string' && s.length > 0
  )
  if (parts.length > 0) return parts.join('\n')
  return fallback
}

/** Apply coalesceTitleLines onto a merged copy bag for known legacy pairs. */
export function applyLegacyTitleLines(
  bag: Record<string, string>,
  props: Record<string, unknown> | undefined | null,
  pairs: ReadonlyArray<readonly [string, string, string]>
): Record<string, string> {
  const out = { ...bag }
  for (const [key, leadKey, trailKey] of pairs) {
    out[key] = coalesceTitleLines(props, key, leadKey, trailKey, bag[key] ?? '')
  }
  return out
}

/**
 * If CMS still has the old single-line form of a default that now uses Enter
 * (`\n`), restore the multiline default so layout is content-driven.
 */
export function restoreMultilineDefaults(
  bag: Record<string, string>,
  defaults: Record<string, string>,
  keys: readonly string[]
): Record<string, string> {
  const out = { ...bag }
  for (const key of keys) {
    const cur = out[key]
    const def = defaults[key]
    if (
      typeof cur === 'string' &&
      typeof def === 'string' &&
      def.includes('\n') &&
      cur === def.replace(/\n/g, ' ')
    ) {
      out[key] = def
    }
  }
  return out
}

const SECTION_TITLE_LEGACY_PAIRS = [
  ['headline', 'headlineLead', 'headlineTrail'],
  ['cloneTitle', 'cloneTitleLead', 'cloneTitleTrail'],
  ['compilerTitle', 'compilerTitleLead', 'compilerTitleTrail'],
  ['pulseTitle', 'pulseTitleLead', 'pulseTitleTrail'],
] as const

/** Fold legacy lead/trail props into unified title fields on layout read/write. */
export function migrateSectionTitleProps(
  props: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...props }
  for (const [key, leadKey, trailKey] of SECTION_TITLE_LEGACY_PAIRS) {
    const joined = coalesceTitleLines(out, key, leadKey, trailKey, '')
    if (joined) out[key] = joined
    delete out[leadKey]
    delete out[trailKey]
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
