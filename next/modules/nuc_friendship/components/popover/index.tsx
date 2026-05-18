'use client'

import React, { useEffect } from 'react'

import { AdHeading } from 'nucleify'

import { NucFriendshipAddFriend } from '../add-friend'
import { NucFriendshipBlockedList } from '../blocked-list'
import { NucFriendshipFriendsList } from '../friends-list'
import { NucFriendshipRequestsList } from '../requests-list'
import { NucFriendshipTabs } from '../tabs'

import { friendshipRequests } from '../../atomic/bosons/utils/api/requests'
import { useFriendshipPopover } from './utils'

export const NucFriendshipPopover: React.FC = () => {
  const {
    results,
    acceptRequest,
    denyRequest,
    removeFriend,
    blockFriend,
    unblockFriend,
    getAllFriendships,
  } = friendshipRequests()

  const {
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
  } = useFriendshipPopover({
    results: results || [],
    acceptRequest,
    denyRequest,
    removeFriend,
    blockFriend,
    unblockFriend,
  })

  useEffect(() => {
    getAllFriendships()
  }, [])

  return (
    <div className="friendship-popover-container">
      <div className="friendship-header">
        <AdHeading tag={3} text="Friends" />
      </div>

      <div className="friendship-content">
        <NucFriendshipAddFriend />

        <NucFriendshipTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'friends' && (
          <NucFriendshipFriendsList
            friends={friends}
            onBlock={handleBlockFriend}
            onRemove={handleRemoveFriend}
          />
        )}

        {activeTab === 'requests' && (
          <NucFriendshipRequestsList
            requests={requests}
            onAccept={handleAcceptRequest}
            onDeny={handleDenyRequest}
          />
        )}

        {activeTab === 'blocked' && (
          <NucFriendshipBlockedList
            blocked={blocked}
            onUnblock={handleUnblockFriend}
          />
        )}
      </div>
    </div>
  )
}
