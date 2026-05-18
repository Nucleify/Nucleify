import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import React, { useMemo, useState } from 'react'

import { AdHeading } from '../../../../../../atomic/atom/heading'

interface ShareFriend {
  id: number
  name: string
  email?: string
}

interface NucShareDialogProps {
  visible: boolean
  adType: ObjectNameType
  selectedEntities: unknown[]
  onUpdateVisible: (visible: boolean) => void
}

export const NucShareDialog: React.FC<NucShareDialogProps> = (props) => {
  const [selectedFriendIds, setSelectedFriendIds] = useState<number[]>([])
  const friends: ShareFriend[] = []
  const selectedEntities = props.selectedEntities
  const loading = false

  const isConfirmDisabled = useMemo(
    () => selectedEntities.length === 0 || selectedFriendIds.length === 0,
    [selectedEntities.length, selectedFriendIds.length]
  )

  const toggleFriend = (id: number) => {
    setSelectedFriendIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const isFriendSelected = (id: number) => selectedFriendIds.includes(id)

  const handleCancel = () => props.onUpdateVisible(false)
  const handleShare = () => props.onUpdateVisible(false)

  const footer = (
    <div className="dialog-buttons-container">
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="secondary"
        onClick={handleCancel}
      />
      <Button
        className={`ad-button-${props.adType}`}
        label="Share"
        icon="pi pi-check"
        disabled={isConfirmDisabled}
        onClick={handleShare}
      />
    </div>
  )

  return (
    <Dialog
      visible={props.visible && !loading}
      modal
      draggable={false}
      className="nuc-dialog share-dialog"
      header={<AdHeading tag={2} text="Share Entities" />}
      footer={footer}
      onHide={() => props.onUpdateVisible(false)}
    >
      <div className="share-dialog-content">
        {selectedEntities?.length > 0 ? (
          <div className="share-dialog-info">
            Selected count: {selectedEntities.length}
          </div>
        ) : (
          <div className="share-dialog-warning">
            No items selected. Select items in the table first.
          </div>
        )}

        <AdHeading tag={5} text="Select Users" />

        <div className="share-dialog-friends">
          {friends?.map((friend: ShareFriend) => (
            <label key={friend.id} className="share-dialog-friend">
              <Checkbox
                checked={isFriendSelected(friend.id)}
                onChange={() => toggleFriend(friend.id)}
                className={`ad-checkbox-${props.adType}`}
              />
              <div className="share-dialog-friend-info">
                <span className="share-dialog-friend-name">{friend.name}</span>

                {friend.email && (
                  <span className="share-dialog-friend-email">
                    {friend.email}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </Dialog>
  )
}
