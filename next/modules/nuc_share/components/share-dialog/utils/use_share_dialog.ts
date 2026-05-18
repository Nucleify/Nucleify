import { useCallback, useEffect, useMemo, useState } from 'react'

import { apiHandle, useApiSuccess } from 'nucleify'

import type {
  Friend,
  FriendshipListItemInterface,
  NucShareDialogInterface,
  UseShareDialogInterface,
} from '../types'

import { apiUrl } from '../../../atomic/utils/api_url'

export function useShareDialog(
  props: NucShareDialogInterface
): UseShareDialogInterface {
  const [friends, setFriends] = useState<Friend[]>([])
  const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const { apiSuccess } = useApiSuccess()

  const selectedEntities = useMemo(
    () => props.selectedEntities ?? [],
    [props.selectedEntities]
  )

  const loadFriends = useCallback(async (): Promise<void> => {
    setLoading(true)
    try {
      await apiHandle<FriendshipListItemInterface[]>({
        url: apiUrl() + '/friendship/all',
        onSuccess: (response) => {
          setFriends(
            (response ?? [])
              .filter((f) => f.status === 'accepted')
              .map((f) => ({
                id: f.friend.id,
                name: f.friend.name,
                email: f.friend.email,
              }))
          )
        },
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (props.visible) {
      void loadFriends()
    }
  }, [props.visible, loadFriends])

  const toggleFriend = useCallback((id: number) => {
    setSelectedFriendIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }, [])

  const isFriendSelected = useCallback(
    (id: number): boolean => selectedFriendIds.includes(id),
    [selectedFriendIds]
  )

  const handleShare = useCallback(async (): Promise<void> => {
    if (selectedFriendIds.length === 0 || selectedEntities.length === 0) {
      return
    }

    const entityIds = selectedEntities.map((e) => (e as { id: number }).id)

    await apiHandle<{ message: string }>({
      url: apiUrl() + '/share',
      method: 'POST',
      data: {
        entity_ids: entityIds,
        entity_type: props.adType,
        user_ids: selectedFriendIds,
      },
      setLoading,
      onSuccess: (response: { message: string }) => {
        apiSuccess(
          response,
          () => Promise.resolve(),
          () => props.onUpdateVisible(false),
          'create'
        )
        setSelectedFriendIds([])
      },
    })
  }, [
    apiSuccess,
    props.adType,
    props.onUpdateVisible,
    selectedEntities,
    selectedFriendIds,
  ])

  const handleCancel = useCallback(() => {
    setSelectedFriendIds([])
    props.onUpdateVisible(false)
  }, [props.onUpdateVisible])

  const isConfirmDisabled = useMemo(
    () => selectedEntities.length === 0 || selectedFriendIds.length === 0,
    [selectedEntities.length, selectedFriendIds.length]
  )

  return {
    friends,
    selectedFriendIds,
    selectedEntities,
    loading,
    isConfirmDisabled,
    handleShare,
    handleCancel,
    toggleFriend,
    isFriendSelected,
  }
}
