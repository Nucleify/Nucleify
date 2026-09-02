import type { NucTranslationObjectInterface } from 'nucleify'

export interface CategoryItem {
  name: string
  count: number
}

export interface PaginatedResponse {
  data: NucTranslationObjectInterface[]
  current_page: number
  last_page: number
  total: number
}

export interface TranslationPageQuery {
  locale: string
  page: number
  perPage?: number
  category?: string
  search?: string
}

export interface TranslationBatchItem {
  id: number
  value: string
}
