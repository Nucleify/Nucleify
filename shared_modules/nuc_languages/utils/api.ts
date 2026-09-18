'use client'

import type {
  AppFramework,
  CategoryItem,
  CloseDialogType,
  NucTranslationObjectInterface,
  NucTranslationRequestsInterface,
  PaginatedResponse,
  TranslationBatchItem,
  TranslationPageQuery,
  UseLoadingInterface,
} from 'nucleify'
import {
  apiHandle,
  apiRequest,
  createEntityRequestState,
  createEntityRequestsCore,
  useApiSuccess,
  useLoading,
} from 'nucleify'

import { buildTranslationsPageUrl, unwrapApiBody } from './translation_api'

const TRANSLATIONS_URL = '/translations'

async function requestTranslation<T>(url: string): Promise<T | undefined> {
  try {
    return unwrapApiBody<T>(await apiRequest(url))
  } catch {
    return undefined
  }
}

async function getTranslationCategories(
  locale: string
): Promise<CategoryItem[]> {
  const list = await requestTranslation<CategoryItem[]>(
    `${TRANSLATIONS_URL}/categories/${locale}`
  )
  return Array.isArray(list) ? list : []
}

async function getTranslationsPage(
  query: TranslationPageQuery
): Promise<PaginatedResponse | null> {
  return (
    (await requestTranslation<PaginatedResponse>(
      buildTranslationsPageUrl(query)
    )) ?? null
  )
}

async function updateTranslationValue(
  id: number,
  value: string,
  onSuccess?: () => void | Promise<void>
): Promise<void> {
  await apiHandle({
    url: TRANSLATIONS_URL,
    method: 'PUT',
    id,
    data: { value },
    onSuccess: async () => {
      await onSuccess?.()
    },
  })
}

async function batchUpdateTranslations(
  items: TranslationBatchItem[],
  onSuccess?: () => void | Promise<void>
): Promise<void> {
  await apiHandle({
    url: `${TRANSLATIONS_URL}/batch`,
    method: 'PUT',
    data: { items },
    onSuccess: async () => {
      await onSuccess?.()
    },
  })
}

export function translationRequests(
  close?: CloseDialogType,
  framework: AppFramework = 'nuxt'
): NucTranslationRequestsInterface {
  const { results, setResults } =
    createEntityRequestState<NucTranslationObjectInterface>(framework)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  const { getAll, store, edit, remove } =
    createEntityRequestsCore<NucTranslationObjectInterface>({
      baseUrl: TRANSLATIONS_URL,
      close,
      apiSuccess,
      includeCount: false,
      setResults,
      setLoading,
    })

  return {
    results,
    loading,
    getAllTranslations: getAll,
    storeTranslation: store,
    editTranslation: edit,
    deleteTranslation: remove,
    getTranslationCategories,
    getTranslationsPage,
    updateTranslationValue,
    batchUpdateTranslations,
  }
}
