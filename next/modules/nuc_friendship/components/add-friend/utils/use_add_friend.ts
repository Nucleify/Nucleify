'use client'

import type { NucUserObjectInterface } from 'nucleify'

import type { UseAddFriendInterface } from '../types'

export function useAddFriend({
  searchEmail,
  friendship,
  users,
}: UseAddFriendInterface) {
  async function handleAddFriend(): Promise<void> {
    if (!searchEmail.trim()) return

    try {
      await users.getAllUsers()
      const user = users.results?.find(
        (u: NucUserObjectInterface) =>
          u.email?.toLowerCase() === searchEmail.toLowerCase()
      )

      if (!user || !user.id) {
        return
      }

      await friendship.sendRequest(user.id)
    } catch (error) {
      console.error('Error adding friend:', error)
    }
  }

  return {
    handleAddFriend,
  }
}
