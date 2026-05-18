'use client'

import type { JSX } from 'react'

import { NucShareCheckbox } from '../share-checkbox'

import { AdHeading } from '../../../../atomic/atom/heading'
import { NucDialog } from '../../../nuc_dialog'
import type { NucShareDialogInterface } from './types'
import { useShareDialog } from './utils/use_share_dialog'

import './_index.scss'

export function NucShareDialog(props: NucShareDialogInterface): JSX.Element {
  const {
    friends,
    selectedEntities,
    loading,
    isConfirmDisabled,
    handleShare,
    handleCancel,
    toggleFriend,
    isFriendSelected,
  } = useShareDialog(props)

  const { adType, visible } = props

  return (
    <NucDialog
      entity={adType}
      visible={!!visible && !loading}
      modal
      draggable={false}
      title="Share Entities"
      action="share"
      cancelButtonLabel="Cancel"
      confirmButtonLabel="Share"
      confirmButtonDisabled={isConfirmDisabled}
      confirm={async () => {
        await handleShare()
      }}
      close={() => {
        handleCancel()
      }}
      onHide={handleCancel}
    >
      <div className="share-dialog">
        <div className="share-dialog-content">
          {selectedEntities.length > 0 ? (
            <div className="share-dialog-info">
              Selected count: {selectedEntities.length}
            </div>
          ) : (
            <div className="share-dialog-warning">
              No items selected. Select items in the table first.
            </div>
          )}

          <div className="share-dialog-subtitle">
            <AdHeading tag={5} text="Select Users" />
          </div>

          <div className="share-dialog-friends">
            {friends.map((friend) => (
              <label key={friend.id} className="share-dialog-friend">
                <NucShareCheckbox
                  adType={adType}
                  checked={isFriendSelected(friend.id)}
                  onToggle={() => toggleFriend(friend.id)}
                />
                <div className="share-dialog-friend-info">
                  <span className="share-dialog-friend-name">
                    {friend.name}
                  </span>
                  {friend.email ? (
                    <span className="share-dialog-friend-email">
                      {friend.email}
                    </span>
                  ) : null}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </NucDialog>
  )
}
