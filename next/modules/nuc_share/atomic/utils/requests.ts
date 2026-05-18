import { useState } from 'react'

import type { ShareRequestInterface, ShareRequestsInterface } from '../types'

import { apiHandle } from '../../../nuc_api/utils/api_handle'
import { useApiSuccess } from '../../../nuc_api/utils/use_api_success'
import { useLoading } from '../../../nuc_loading/utils/use_loading'
import { apiUrl } from './api_url'

export function useShareRequests(): ShareRequestsInterface {
  const [received, setReceived] = useState<ShareRequestInterface[]>([])
  const [sent, setSent] = useState<ShareRequestInterface[]>([])
  const [pendingCount, setPendingCount] = useState<number>(0)

  const { loading, setLoading } = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getReceived(): Promise<void> {
    await apiHandle<ShareRequestInterface[]>({
      url: apiUrl() + '/share/received',
      setLoading,
      onSuccess: (response) => {
        setReceived(response ?? [])
      },
    })
  }

  async function getSent(): Promise<void> {
    await apiHandle<ShareRequestInterface[]>({
      url: apiUrl() + '/share/sent',
      setLoading,
      onSuccess: (response) => {
        setSent(response ?? [])
      },
    })
  }

  async function getPendingCount(): Promise<void> {
    await apiHandle<{ count: number }>({
      url: apiUrl() + '/share/count',
      onSuccess: (response) => {
        setPendingCount(response.count ?? 0)
      },
    })
  }

  async function loadAll(): Promise<void> {
    await Promise.all([getReceived(), getSent(), getPendingCount()])
  }

  async function acceptRequest(id: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/share/' + id + '/accept',
      method: 'POST',
      setLoading,
      onSuccess: (response) => {
        apiSuccess(response, loadAll)
      },
    })
  }

  async function rejectRequest(id: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/share/' + id + '/reject',
      method: 'POST',
      setLoading,
      onSuccess: (response) => {
        apiSuccess(response, loadAll)
      },
    })
  }

  async function cancelRequest(id: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/share/' + id + '/cancel',
      method: 'POST',
      setLoading,
      onSuccess: (response) => {
        apiSuccess(response, loadAll)
      },
    })
  }

  return {
    received,
    sent,
    pendingCount,
    loading,
    loadAll,
    acceptRequest,
    rejectRequest,
    cancelRequest,
  }
}
