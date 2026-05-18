'use client'

import type { JSX } from 'react'

import { AdButton, AdTag } from 'nucleify'

import { NucShareRequestsItem } from '../share-requests-item'

import type { ShareRequestInterface } from '../../atomic/types'

import './_index.scss'

type NucShareRequestsListProps = {
  requests?: ShareRequestInterface[]
  isReceived?: boolean
  onAccept?: (id: number) => void
  onReject?: (id: number) => void
  onCancel?: (id: number) => void
}

export function NucShareRequestsList({
  requests = [],
  isReceived = false,
  onAccept,
  onReject,
  onCancel,
}: NucShareRequestsListProps): JSX.Element {
  if (requests.length === 0) {
    return (
      <div className="share-requests-list">
        <div className="share-requests-list-empty">
          <p>No share requests</p>
        </div>
      </div>
    )
  }

  return (
    <div className="share-requests-list">
      {requests.map((request) => (
        <NucShareRequestsItem
          key={request.id}
          request={request}
          isReceived={isReceived}
          actions={
            isReceived ? (
              <>
                <AdButton
                  adType="main"
                  icon="prime:check"
                  text
                  rounded
                  onClick={() => onAccept?.(request.id)}
                />
                <AdButton
                  icon="prime:times"
                  text
                  rounded
                  severity="danger"
                  onClick={() => onReject?.(request.id)}
                />
              </>
            ) : request.status === 'pending' ? (
              <AdButton
                adType="main"
                icon="prime:times"
                text
                rounded
                severity="secondary"
                onClick={() => onCancel?.(request.id)}
              />
            ) : (
              <AdTag
                value={request.status}
                severity={request.status === 'accepted' ? 'success' : 'danger'}
              />
            )
          }
        />
      ))}
    </div>
  )
}
