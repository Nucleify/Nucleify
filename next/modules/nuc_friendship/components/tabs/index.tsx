'use client'

import React from 'react'

import type { NucFriendshipTabType } from 'nucleify'
import { AdButton } from 'nucleify'

interface NucFriendshipTabsProps {
  activeTab: NucFriendshipTabType
  onTabChange: (tab: NucFriendshipTabType) => void
}

export const NucFriendshipTabs: React.FC<NucFriendshipTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: NucFriendshipTabType[] = ['friends', 'requests', 'blocked']

  function toTitleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="friendship-tabs">
      {tabs.map((tab) => (
        <AdButton
          key={tab}
          label={toTitleCase(tab)}
          text={activeTab !== tab}
          adType="main"
          className="tab-button"
          onClick={() => onTabChange(tab)}
        />
      ))}
    </div>
  )
}
