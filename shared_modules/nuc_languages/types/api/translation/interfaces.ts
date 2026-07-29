import type {
  CategoryItem,
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  LoadingRefType,
  NucTranslationObjectInterface,
  PaginatedResponse,
  StoreEntityRequestType,
  TranslationBatchItem,
  TranslationPageQuery,
} from 'nucleify'

export interface NucTranslationRequestsInterface {
  results: EntityResultsType<NucTranslationObjectInterface>
  loading: LoadingRefType
  getAllTranslations: GetAllEntitiesRequestType<NucTranslationObjectInterface>
  storeTranslation: StoreEntityRequestType<NucTranslationObjectInterface>
  editTranslation: EditEntityRequestType<NucTranslationObjectInterface>
  deleteTranslation: DeleteEntityRequestType
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
