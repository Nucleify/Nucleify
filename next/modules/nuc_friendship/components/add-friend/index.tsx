'use client'

import React, { useState } from 'react'

import { AdButton, AdInputText, userRequests } from 'nucleify'

import { friendshipRequests } from '../../atomic/bosons/utils/api/requests'
import { useAddFriend } from './utils'

export const NucFriendshipAddFriend: React.FC = () => {
  const friendship = friendshipRequests()
  const users = userRequests()

  const [searchEmail, setSearchEmail] = useState('')

  const { handleAddFriend: handleAddFriendFn } = useAddFriend({
    searchEmail,
    friendship,
    users,
  })

  async function handleAddFriend() {
    await handleAddFriendFn()
    setSearchEmail('')
  }

  return (
    <div className="add-friend">
      <div className="add-friend-input">
        <AdInputText
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="User email"
          adType="main"
          className="search-input"
          onKeyUp={(e) => e.key === 'Enter' && handleAddFriend()}
        />
        <AdButton
          label="Invite"
          icon="prime:user-plus"
          adType="main"
          loading={friendship.loading}
          onClick={handleAddFriend}
        />
      </div>
    </div>
  )
}
