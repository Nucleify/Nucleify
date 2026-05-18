'use client'

import React from 'react'

import { AdIcon, AdParagraph } from 'nucleify'

import { type NucFriendshipObjectInterface } from '../../atomic/bosons/types/object/interfaces'

interface NucFriendItemProps {
  friendship: NucFriendshipObjectInterface
  actions?: (props: { friendId: number }) => React.ReactNode
}

export const NucFriendItem: React.FC<NucFriendItemProps> = ({
  friendship,
  actions,
}) => {
  return (
    <div className="friend-item">
      <div className="friend-info">
        <AdIcon icon="prime:user" size="1.5em" />
        <div className="friend-details">
          <AdParagraph text={friendship.friend.name} />
          <div className="friend-email">
            <AdParagraph text={friendship.friend.email} />
          </div>
        </div>
      </div>
      <div className="friend-actions">
        {actions?.({ friendId: friendship.friend.id })}
      </div>
    </div>
  )
}
