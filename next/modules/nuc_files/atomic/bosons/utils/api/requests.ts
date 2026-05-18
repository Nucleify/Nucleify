'use client'

import { useState } from 'react'

import type {
  CloseDialogType,
  NucFileObjectInterface,
  NucFileRequestsInterface,
} from '../../types'

function apiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? ''
}

async function apiHandle<T>(options: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: unknown
  id?: number
  setLoading?: (val: boolean) => void
  onSuccess?: (response: T) => void
}): Promise<void> {
  const { url, method = 'GET', data, id, setLoading, onSuccess } = options

  const fullUrl = id !== undefined ? `${url}/${id}` : url

  options.setLoading?.(true)
  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) throw new Error(`Request failed: ${response.status}`)

    const json = (await response.json()) as T
    onSuccess?.(json)
  } catch (err) {
    console.error('[fileRequests] API error:', err)
  } finally {
    setLoading?.(false)
  }
}

export function useFileRequests(
  close?: CloseDialogType
): NucFileRequestsInterface {
  const [results, setResults] = useState<NucFileObjectInterface[]>([])
  const [createdLastWeek, setCreatedLastWeek] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  async function getAllFiles(showLoading?: boolean): Promise<void> {
    await apiHandle<NucFileObjectInterface[]>({
      url: apiUrl() + '/files',
      setLoading: showLoading ? setLoading : undefined,
      onSuccess: (response) => {
        setResults(response)
      },
    })
  }

  async function getCountFilesByCreatedLastWeek(
    showLoading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/files/count-by-created-last-week',
      setLoading: showLoading ? setLoading : undefined,
      onSuccess: (response) => {
        setCreatedLastWeek(response)
      },
    })
  }

  async function storeFile(
    data: NucFileObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFileObjectInterface>({
      url: apiUrl() + '/files',
      method: 'POST',
      data,
      onSuccess: async () => {
        await getData()
        close?.()
      },
    })
  }

  async function editFile(
    data: NucFileObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFileObjectInterface>({
      url: apiUrl() + '/files',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: async () => {
        await getData()
        close?.()
      },
    })
  }

  async function deleteFile(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucFileObjectInterface>({
      url: apiUrl() + '/files',
      method: 'DELETE',
      id,
      onSuccess: async () => {
        await getData()
        close?.()
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllFiles,
    getCountFilesByCreatedLastWeek,
    storeFile,
    editFile,
    deleteFile,
  }
}
