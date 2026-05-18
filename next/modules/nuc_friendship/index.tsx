'use client'

import React, { useEffect } from 'react'

import { AdPopover, isMobile } from 'nucleify'

import { friendshipRequests } from './atomic/bosons/utils/api/requests'
import { NucFriendshipPopover } from './components/popover'

interface NucFriendshipProps {
  position: PositionType
}

export const NucFriendship: React.FC<NucFriendshipProps> = ({ position }) => {
  const { loading, getAllFriendships } = friendshipRequests()

  useEffect(() => {
    getAllFriendships(true)
  }, [])

  if (loading) return null

  return (
    <AdPopover
      dismissable
      icon="prime:users"
      position={position}
      popoverClass="friendship-popover"
      buttonText={isMobile() ? '' : 'Friends'}
      buttonClass="friendship-popover-toggle"
    >
      <NucFriendshipPopover />
    </AdPopover>
  )
}

export default NucFriendship
