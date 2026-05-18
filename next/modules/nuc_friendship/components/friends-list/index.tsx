'use client'

import React from 'react'

import { AdButton, AdParagraph } from 'nucleify'

import { NucFriendItem } from '../friend-item'

import { type NucFriendshipObjectInterface } from '../../atomic/bosons/types/object/interfaces'

interface NucFriendshipFriendsListProps {
  friends: NucFriendshipObjectInterface[]
  onBlock: (friendId: number) => void
  onRemove: (friendId: number) => void
}

export const NucFriendshipFriendsList: React.FC<
  NucFriendshipFriendsListProps
> = ({ friends, onBlock, onRemove }) => {
  return (
    <div className="friends-list">
      {friends.length === 0 && (
        <div className="empty-state">
          <AdParagraph text="No friends found" />
        </div>
      )}
      {friends.map((friendship) => (
        <NucFriendItem
          key={friendship.id}
          friendship={friendship}
          actions={({ friendId }) => (
            <>
              <AdButton
                icon="prime:ban"
                text
                rounded
                adType="main"
                onClick={() => onBlock(friendId)}
              />
              <AdButton
                icon="prime:trash"
                text
                rounded
                severity="danger"
                onClick={() => onRemove(friendId)}
              />
            </>
          )}
        />
      ))}
    </div>
  )
}
