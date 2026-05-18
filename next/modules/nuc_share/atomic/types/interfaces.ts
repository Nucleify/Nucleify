export interface ShareRequestSender {
  id: number
  name: string
  email: string
}

export interface ShareRequestInterface {
  id: number
  sender_id: number
  receiver_id: number
  entity_type: string
  entity_ids: number[]
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  sender?: ShareRequestSender
  receiver?: ShareRequestSender
}

export interface ShareRequestsInterface {
  received: ShareRequestInterface[]
  sent: ShareRequestInterface[]
  pendingCount: number
  loading: boolean
  loadAll: () => Promise<void>
  acceptRequest: (id: number) => Promise<void>
  rejectRequest: (id: number) => Promise<void>
  cancelRequest: (id: number) => Promise<void>
}

export type ShareTabType = 'received' | 'sent'
