'use client'

import { useState } from 'react'

import type {
  CloseDialogType,
  NucMoneyObjectInterface,
  UseLoadingInterface,
} from 'nucleify'
import {
  apiHandle,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'nucleify'

import type { NucMoneyRequestsInterface } from '../../types/api'

export function moneyRequests(
  close?: CloseDialogType
): NucMoneyRequestsInterface {
  const [results, setResults] = useState<NucMoneyObjectInterface[]>([])
  const [createdLastWeek, setCreatedLastWeek] = useState<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllMoney(loading?: boolean): Promise<void> {
    await apiHandle<NucMoneyObjectInterface[]>({
      url: '/api/money',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucMoneyObjectInterface[]) => {
        setResults(response)
      },
    })
  }

  async function getCountMoneyByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: '/api/money/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        setCreatedLastWeek(response)
      },
    })
  }

  async function storeMoney(
    data: NucMoneyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucMoneyObjectInterface>({
      url: '/api/money',
      method: 'POST',
      data: {
        user_id: sessionStorageGetItem('user_id'),
        ...data,
      },
      onSuccess: (response: NucMoneyObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editMoney(
    data: NucMoneyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucMoneyObjectInterface>({
      url: '/api/money',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: NucMoneyObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteMoney(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucMoneyObjectInterface>({
      url: '/api/money',
      method: 'DELETE',
      id,
      onSuccess: (response: NucMoneyObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllMoney,
    getCountMoneyByCreatedLastWeek,
    storeMoney,
    editMoney,
    deleteMoney,
  }
}
