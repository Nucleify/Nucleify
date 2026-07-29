import type { ActionType, CloseDialogType } from 'nucleify'

export type EntityRequestsCoreOptions<T extends { id?: number }> = {
  baseUrl: string
  close?: CloseDialogType
  apiSuccess: (
    response: T,
    getData: () => Promise<void>,
    close: CloseDialogType | undefined,
    action: ActionType
  ) => void
  setResults: (response: T[]) => void
  setCreatedLastWeek?: (count: number) => void
  setLoading?: (loading: boolean) => void
  mapStoreData?: (data: T) => T | Record<string, unknown>
  includeCount?: boolean
  includeStore?: boolean
  includeEdit?: boolean
  includeDelete?: boolean
}

export type EntityRequestsCore<T extends { id?: number }> = {
  getAll: (showLoading?: boolean) => Promise<void>
  getCountByCreatedLastWeek: (showLoading?: boolean) => Promise<void>
  store: (data: T, getData: () => Promise<void>) => Promise<void>
  edit: (data: T, getData: () => Promise<void>) => Promise<void>
  remove: (id: number, getData: () => Promise<void>) => Promise<void>
}
