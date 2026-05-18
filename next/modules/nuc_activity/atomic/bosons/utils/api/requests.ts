'use client'

import { useState } from 'react'

import {
  apiHandle,
  type CloseDialogType,
  type NucActivityObjectInterface,
  type NucActivityRequestsInterface,
  type UseLoadingInterface,
  useApiSuccess,
  useLoading,
} from 'nucleify'

export function activityRequests(
  close?: CloseDialogType
): NucActivityRequestsInterface {
  const [results, setResults] = useState<NucActivityObjectInterface[]>([])
  const [createdLastWeek, setCreatedLastWeek] = useState<number>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllActivities(loadingFlag?: boolean): Promise<void> {
    await apiHandle<NucActivityObjectInterface[]>({
      url: '/api/activity-log',
      setLoading: loadingFlag ? setLoading : undefined,
      onSuccess: (response: NucActivityObjectInterface[]) => {
        setResults(response)
      },
    })
  }

  async function getCountActivitiesByCreatedLastWeek(
    loadingFlag?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: '/api/activity-log/count-by-created-last-week',
      setLoading: loadingFlag ? setLoading : undefined,
      onSuccess: (response: number) => {
        setCreatedLastWeek(response)
      },
    })
  }

  async function deleteActivity(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucActivityObjectInterface>({
      url: '/api/activity-log',
      method: 'DELETE',
      id,
      onSuccess: (response: NucActivityObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllActivities,
    getCountActivitiesByCreatedLastWeek,
    deleteActivity,
  }
}
