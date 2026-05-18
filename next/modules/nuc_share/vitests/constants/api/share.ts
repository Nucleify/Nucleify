import type { ShareRequestInterface } from '../../../atomic/types'

export const mockShareRequest: ShareRequestInterface = {
  id: 99,
  sender_id: 1,
  receiver_id: 2,
  entity_type: 'article',
  entity_ids: [1, 2, 3],
  status: 'pending',
  created_at: new Date().toISOString(),
  sender: {
    id: 1,
    name: 'Test Sender',
    email: 'sender@example.com',
  },
  receiver: {
    id: 2,
    name: 'Test Receiver',
    email: 'receiver@example.com',
  },
}

export const mockShareRequests: ShareRequestInterface[] = [mockShareRequest]
