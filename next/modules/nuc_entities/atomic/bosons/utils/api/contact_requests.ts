'use client'

import { useState } from 'react'

import type {
  CloseDialogType,
  NucContactObjectInterface,
  UseLoadingInterface,
} from 'nucleify'
import {
  apiHandle,
  sessionStorageGetItem,
  useApiSuccess,
  useLoading,
} from 'nucleify'

import type { NucContactRequestsInterface } from '../../types/api'

export function contactRequests(
  close?: CloseDialogType
): NucContactRequestsInterface {
  const [results, setResults] = useState<NucContactObjectInterface[]>([])
  const [createdLastWeek, setCreatedLastWeek] = useState<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllContacts(loading?: boolean): Promise<void> {
    await apiHandle<NucContactObjectInterface[]>({
      url: '/api/contacts',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucContactObjectInterface[]) => {
        setResults(response)
      },
    })
  }

  async function getCountContactsByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: '/api/contacts/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        setCreatedLastWeek(response)
      },
    })
  }

  async function storeContact(
    data: NucContactObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucContactObjectInterface>({
      url: '/api/contacts',
      method: 'POST',
      data: {
        user_id: sessionStorageGetItem('user_id'),
        ...data,
      },
      onSuccess: (response: NucContactObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editContact(
    data: NucContactObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucContactObjectInterface>({
      url: '/api/contacts',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: NucContactObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteContact(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucContactObjectInterface>({
      url: '/api/contacts',
      method: 'DELETE',
      id,
      onSuccess: (response: NucContactObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllContacts,
    getCountContactsByCreatedLastWeek,
    storeContact,
    editContact,
    deleteContact,
  }
}
