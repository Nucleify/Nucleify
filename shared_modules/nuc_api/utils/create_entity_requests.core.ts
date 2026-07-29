import type { EntityRequestsCore, EntityRequestsCoreOptions } from 'nucleify'

import { apiHandle } from './api_handle'

export function createEntityRequestsCore<T extends { id?: number }>({
  baseUrl,
  close,
  apiSuccess,
  setResults,
  setCreatedLastWeek,
  setLoading,
  mapStoreData,
  includeCount = true,
  includeStore = true,
  includeEdit = true,
  includeDelete = true,
}: EntityRequestsCoreOptions<T>): EntityRequestsCore<T> {
  async function getAll(showLoading?: boolean): Promise<void> {
    await apiHandle<T[]>({
      url: baseUrl,
      setLoading: showLoading ? setLoading : undefined,
      onSuccess: setResults,
    })
  }

  async function getCountByCreatedLastWeek(
    showLoading?: boolean
  ): Promise<void> {
    if (!includeCount || !setCreatedLastWeek) return

    await apiHandle<number>({
      url: `${baseUrl}/count-by-created-last-week`,
      setLoading: showLoading ? setLoading : undefined,
      onSuccess: setCreatedLastWeek,
    })
  }

  async function store(data: T, getData: () => Promise<void>): Promise<void> {
    if (!includeStore) return

    const payload = mapStoreData ? mapStoreData(data) : data

    await apiHandle<T>({
      url: baseUrl,
      method: 'POST',
      data: payload,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function edit(data: T, getData: () => Promise<void>): Promise<void> {
    if (!includeEdit) return

    await apiHandle<T>({
      url: baseUrl,
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function remove(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    if (!includeDelete) return

    await apiHandle<T>({
      url: baseUrl,
      method: 'DELETE',
      id,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    getAll,
    getCountByCreatedLastWeek,
    store,
    edit,
    remove,
  }
}
