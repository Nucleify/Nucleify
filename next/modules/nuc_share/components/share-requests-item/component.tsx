'use client'

import type { JSX, ReactNode } from 'react'

import type { ShareRequestInterface } from '../../atomic/types'

import './_index.scss'

type NucShareRequestsItemProps = {
  request: ShareRequestInterface
  isReceived?: boolean
  actions?: ReactNode
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}

export function NucShareRequestsItem({
  request,
  isReceived = false,
  actions,
}: NucShareRequestsItemProps): JSX.Element {
  const name = isReceived ? request.sender?.name : request.receiver?.name

  return (
    <div className="share-request-item">
      <div className="share-request-info">
        <div className="share-request-details">
          <p>{name}</p>
          <p className="share-request-meta">
            {request.entity_ids.length} {request.entity_type}(s) •{' '}
            {formatDate(request.created_at)}
          </p>
        </div>
      </div>
      <div className="share-request-actions">{actions}</div>
    </div>
  )
}
