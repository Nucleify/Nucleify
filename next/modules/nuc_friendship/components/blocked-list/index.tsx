'use client'

import React from 'react'

import { AdButton, AdParagraph } from 'nucleify'

import { NucFriendItem } from '../friend-item'

import { type NucFriendshipObjectInterface } from '../../atomic/bosons/types/object/interfaces'

interface NucFriendshipBlockedListProps {
  blocked: NucFriendshipObjectInterface[]
  onUnblock: (friendId: number) => void
}

export const NucFriendshipBlockedList: React.FC<
  NucFriendshipBlockedListProps
> = ({ blocked, onUnblock }) => {
  return (
    <div className="blocked-list">
      {blocked.length === 0 && (
        <div className="empty-state">
          <AdParagraph text="No blocked users" />
        </div>
      )}
      {blocked.map((friendship) => (
        <NucFriendItem
          key={friendship.id}
          friendship={friendship}
          actions={({ friendId }) => (
            <AdButton
              icon="prime:unlock"
              text
              rounded
              adType="main"
              onClick={() => onUnblock(friendId)}
            />
          )}
        />
      ))}
    </div>
  )
}
