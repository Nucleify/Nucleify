import type {
  NucTranslationObjectInterface,
  PaginatedResponse,
  TranslationBatchItem,
} from 'nucleify'

export function countChangedTranslations(
  editValues: Record<number, string>,
  originalValues: Record<number, string>
): number {
  return Object.entries(editValues).reduce(
    (count, [idStr, value]) =>
      value !== originalValues[Number(idStr)] ? count + 1 : count,
    0
  )
}

export function collectChangedTranslations(
  editValues: Record<number, string>,
  originalValues: Record<number, string>
): TranslationBatchItem[] {
  return Object.entries(editValues).flatMap(([idStr, value]) => {
    const id = Number(idStr)
    if (!id || value === originalValues[id]) return []
    return [{ id, value }]
  })
}

export function mergeTranslationItems(
  prev: Record<number, string>,
  items: NucTranslationObjectInterface[]
): Record<number, string> {
  const next = { ...prev }
  for (const item of items) {
    if (item.id != null && !(item.id in next)) {
      next[item.id] = item.value ?? ''
    }
  }
  return next
}

export function parseTranslationPage(
  response: PaginatedResponse | null | undefined,
  page: number
): {
  rows: NucTranslationObjectInterface[]
  currentPage: number
  lastPage: number
  totalRows: number
} {
  const rows = response?.data ?? []
  return {
    rows,
    currentPage: response?.current_page ?? page,
    lastPage: response?.last_page ?? 1,
    totalRows: response?.total ?? rows.length,
  }
}
