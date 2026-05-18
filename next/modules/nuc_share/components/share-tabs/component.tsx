'use client'

import type { JSX } from 'react'

import { AdButton } from 'nucleify'

import type { ShareTabType } from '../../atomic/types'

import './_index.scss'

type NucShareTabsProps = {
  activeTab: ShareTabType
  onUpdateActiveTab: (tab: ShareTabType) => void
}

export function NucShareTabs({
  activeTab,
  onUpdateActiveTab,
}: NucShareTabsProps): JSX.Element {
  return (
    <div className="share-tabs">
      <AdButton
        adType="main"
        label="Received"
        text={activeTab !== 'received'}
        className="tab-button"
        onClick={() => onUpdateActiveTab('received')}
      />
      <AdButton
        adType="main"
        label="Sent"
        text={activeTab !== 'sent'}
        className="tab-button"
        onClick={() => onUpdateActiveTab('sent')}
      />
    </div>
  )
}
