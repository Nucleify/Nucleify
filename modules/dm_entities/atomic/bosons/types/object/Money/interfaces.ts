export interface MoneyObjectInterface {
  id?: number
  user_id?: number
  sender: string
  receiver: string
  count: number
  title: string
  description: string
  category: string
  created_at: string
  updated_at?: string
}
