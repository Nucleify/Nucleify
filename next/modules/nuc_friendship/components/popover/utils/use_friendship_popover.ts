'use client'

import { useMemo, useState } from 'react'

import type { UseFriendshipPopoverInterface } from '../types'

import type { NucFriendshipTabType } from '../../tabs/types'

export function useFriendshipPopover({
  results,
  acceptRequest,
  denyRequest,
  removeFriend,
  blockFriend,
  unblockFriend,
}: UseFriendshipPopoverInterface) {
  const [activeTab, setActiveTab] = useState<NucFriendshipTabType>('friends')

  const friends = useMemo(
    () => results?.filter((f) => f.status === 'accepted') ?? [],
    [results]
  )

  const requests = useMemo(
    () => results?.filter((f) => f.status === 'pending') ?? [],
    [results]
  )

  const blocked = useMemo(
    () => results?.filter((f) => f.status === 'blocked') ?? [],
    [results]
  )

  async function handleAcceptRequest(senderId: number) {
    await acceptRequest(senderId)
  }

  async function handleDenyRequest(senderId: number) {
    await denyRequest(senderId)
  }

  async function handleRemoveFriend(friendId: number) {
    await removeFriend(friendId)
  }

  async function handleBlockFriend(friendId: number) {
    await blockFriend(friendId)
  }

  async function handleUnblockFriend(friendId: number) {
    await unblockFriend(friendId)
  }

  return {
    activeTab,
    setActiveTab,
    friends,
    requests,
    blocked,
    handleAcceptRequest,
    handleDenyRequest,
    handleRemoveFriend,
    handleBlockFriend,
    handleUnblockFriend,
  }
}
