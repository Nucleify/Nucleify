'use client'

import { type JSX, useEffect, useState } from 'react'

import { AdHeading } from 'nucleify'

import { NucShareRequestsList } from '../share-requests-list'
import { NucShareTabs } from '../share-tabs'

import type { ShareTabType } from '../../atomic/types'
import { useShareRequests } from '../../atomic/utils/requests'

import './_index.scss'

export function NucSharePopover(): JSX.Element {
  const [activeTab, setActiveTab] = useState<ShareTabType>('received')

  const {
    received,
    sent,
    loadAll,
    acceptRequest,
    rejectRequest,
    cancelRequest,
  } = useShareRequests()

  useEffect(() => {
    void loadAll()
  }, [])

  return (
    <div className="share-popover-container">
      <div className="share-popover-header">
        <AdHeading tag={3} text="Share Requests" />
      </div>

      <div className="share-popover-content">
        <NucShareTabs activeTab={activeTab} onUpdateActiveTab={setActiveTab} />

        {activeTab === 'received' ? (
          <NucShareRequestsList
            requests={received}
            isReceived
            onAccept={(id) => void acceptRequest(id)}
            onReject={(id) => void rejectRequest(id)}
          />
        ) : null}

        {activeTab === 'sent' ? (
          <NucShareRequestsList
            requests={sent}
            onCancel={(id) => void cancelRequest(id)}
          />
        ) : null}
      </div>
    </div>
  )
}
