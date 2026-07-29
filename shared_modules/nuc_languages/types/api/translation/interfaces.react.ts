import type {
  CategoryItem,
  EntityResultsType,
  LoadingType,
  NucTranslationObjectInterface,
  PaginatedResponse,
  TranslationBatchItem,
  TranslationPageQuery,
} from 'nucleify'

export interface NucTranslationRequestsInterface {
  results: EntityResultsType<NucTranslationObjectInterface>
  loading: LoadingType
  getAllTranslations: (loading?: boolean) => Promise<void>
  storeTranslation: (
    data: NucTranslationObjectInterface,
    getData: () => Promise<void>
  ) => Promise<void>
  editTranslation: (
    data: NucTranslationObjectInterface,
    getData: () => Promise<void>
  ) => Promise<void>
  deleteTranslation: (id: number, getData: () => Promise<void>) => Promise<void>
  getTranslationCategories: (locale: string) => Promise<CategoryItem[]>
  getTranslationsPage: (
    query: TranslationPageQuery
  ) => Promise<PaginatedResponse | null>
  updateTranslationValue: (
    id: number,
    value: string,
    onSuccess?: () => void | Promise<void>
  ) => Promise<void>
  batchUpdateTranslations: (
    items: TranslationBatchItem[],
    onSuccess?: () => void | Promise<void>
  ) => Promise<void>
}
