export interface NucFriendshipObjectInterface {
  id: number
  friend: {
    id: number
    name: string
    email: string
    role: string
  }
  status: 'pending' | 'accepted' | 'denied' | 'blocked'
  created_at: string
  updated_at: string
}
