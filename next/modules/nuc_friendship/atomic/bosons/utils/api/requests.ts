'use client'

import { useState } from 'react'

import type { UseLoadingInterface } from 'nucleify'
import { apiHandle, useApiSuccess, useLoading } from 'nucleify'

import type { NucFriendshipRequestsInterface } from '../../types/api/interfaces'
import type { NucFriendshipObjectInterface } from '../../types/object/interfaces'

function apiUrl(): string {
  return '/api'
}

export function useFriendshipRequests(): NucFriendshipRequestsInterface {
  const [results, setResults] = useState<NucFriendshipObjectInterface[]>([])

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllFriendships(loading?: boolean): Promise<void> {
    await apiHandle<NucFriendshipObjectInterface[]>({
      url: apiUrl() + '/friendship/all',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucFriendshipObjectInterface[]) => {
        setResults(response)
      },
    })
  }

  async function sendRequest(recipientId: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/friendship/send-request',
      method: 'POST',
      id: recipientId,
      onSuccess: () => {
        apiSuccess(
          { message: 'Friend request sent successfully' },
          getAllFriendships,
          undefined,
          'create'
        )
      },
    })
  }

  async function acceptRequest(senderId: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/friendship/accept-request',
      method: 'POST',
      id: senderId,
      onSuccess: () => {
        apiSuccess(
          { message: 'Friend request accepted successfully' },
          getAllFriendships,
          undefined,
          'edit'
        )
      },
    })
  }

  async function denyRequest(senderId: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/friendship/deny-request',
      method: 'POST',
      id: senderId,
      onSuccess: () => {
        apiSuccess(
          { message: 'Friend request denied successfully' },
          getAllFriendships,
          undefined,
          'edit'
        )
      },
    })
  }

  async function removeFriend(friendId: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/friendship/remove',
      method: 'DELETE',
      id: friendId,
      onSuccess: () => {
        apiSuccess(
          { message: 'Friend removed successfully' },
          getAllFriendships,
          undefined,
          'delete'
        )
      },
    })
  }

  async function blockFriend(friendId: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/friendship/block',
      method: 'POST',
      id: friendId,
      onSuccess: () => {
        apiSuccess(
          { message: 'Friend blocked successfully' },
          getAllFriendships,
          undefined,
          'edit'
        )
      },
    })
  }

  async function unblockFriend(friendId: number): Promise<void> {
    await apiHandle<{ message: string }>({
      url: apiUrl() + '/friendship/unblock',
      method: 'DELETE',
      id: friendId,
      onSuccess: () => {
        apiSuccess(
          { message: 'Friend unblocked successfully' },
          getAllFriendships,
          undefined,
          'edit'
        )
      },
    })
  }

  return {
    results,
    loading,
    getAllFriendships,
    sendRequest,
    acceptRequest,
    denyRequest,
    removeFriend,
    blockFriend,
    unblockFriend,
  }
}

export { useFriendshipRequests as friendshipRequests }
