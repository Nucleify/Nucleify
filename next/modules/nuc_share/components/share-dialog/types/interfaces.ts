export interface NucShareDialogInterface {
  adType?: AdTypeType
  visible?: boolean
  selectedEntities?: unknown[]
  onUpdateVisible: (visible: boolean) => void
}

export interface Friend {
  id: number
  name: string
  email?: string
}

export interface FriendshipListItemInterface {
  status: 'pending' | 'accepted' | 'denied' | 'blocked'
  friend: {
    id: number
    name: string
    email?: string
  }
}

export interface UseShareDialogInterface {
  friends: Friend[]
  selectedFriendIds: number[]
  selectedEntities: unknown[]
  loading: boolean
  isConfirmDisabled: boolean
  handleShare: () => Promise<void>
  handleCancel: () => void
  toggleFriend: (id: number) => void
  isFriendSelected: (id: number) => boolean
}
