import { type ApiRoute, when } from 'nuc_api'

import {
  handleTranslationBatch,
  handleTranslationCategories,
  handleTranslationDelete,
  handleTranslationList,
  handleTranslationLocale,
  handleTranslationPatch,
} from './languages_handlers'

/** GET /translations/categories/:locale */
export const routeTranslationCategories = when(
  { method: 'GET', len: 3, path: [undefined, 'categories'] },
  handleTranslationCategories
)

/** GET /translations/locale/:locale */
export const routeTranslationLocale = when(
  { method: 'GET', len: 3, path: [undefined, 'locale'] },
  handleTranslationLocale
)

/** PUT|POST /translations/batch */
export const routeTranslationBatch = when(
  { path: [undefined, 'batch'], method: ['PUT', 'POST'] },
  handleTranslationBatch
)

/** PUT|PATCH /translations/:id */
export const routeTranslationPatch = when(
  { method: ['PUT', 'PATCH'], len: 2 },
  handleTranslationPatch
)

/** DELETE /translations/:id */
export const routeTranslationDelete = when(
  { method: 'DELETE', len: 2 },
  handleTranslationDelete
)

/** GET /translations?locale&page&per_page&category&search */
export const routeTranslationList = when(
  { method: 'GET', len: 1 },
  handleTranslationList
)

export const translationRoutes: ApiRoute[] = [
  routeTranslationCategories,
  routeTranslationLocale,
  routeTranslationBatch,
  routeTranslationPatch,
  routeTranslationDelete,
  routeTranslationList,
]
