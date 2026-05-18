'use client'

import { useState } from 'react'

import type {
  CloseDialogType,
  NucArticleObjectInterface,
  UseLoadingInterface,
} from 'nucleify'
import {
  apiHandle,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'nucleify'

import type { NucArticleRequestsInterface } from '../../types/api'

export function articleRequests(
  close?: CloseDialogType
): NucArticleRequestsInterface {
  const [results, setResults] = useState<NucArticleObjectInterface[]>([])
  const [createdLastWeek, setCreatedLastWeek] = useState<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllArticles(loading?: boolean): Promise<void> {
    await apiHandle<NucArticleObjectInterface[]>({
      url: '/api/articles',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucArticleObjectInterface[]) => {
        setResults(response)
      },
    })
  }

  async function getCountArticlesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: '/api/articles/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        setCreatedLastWeek(response)
      },
    })
  }

  async function storeArticle(
    data: NucArticleObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucArticleObjectInterface>({
      url: '/api/articles',
      method: 'POST',
      data: {
        user_id: sessionStorageGetItem('user_id'),
        ...data,
      },
      onSuccess: (response: NucArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editArticle(
    data: NucArticleObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucArticleObjectInterface>({
      url: '/api/articles',
      method: 'PUT',
      data: data,
      id: data.id,
      onSuccess: (response: NucArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteArticle(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucArticleObjectInterface>({
      url: '/api/articles',
      method: 'DELETE',
      id,
      onSuccess: (response: NucArticleObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllArticles,
    getCountArticlesByCreatedLastWeek,
    storeArticle,
    editArticle,
    deleteArticle,
  }
}
