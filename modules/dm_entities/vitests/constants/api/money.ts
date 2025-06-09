import type { MoneyObjectInterface } from 'atomic'

export const mockMoney: MoneyObjectInterface = {
  id: 999999,
  user_id: 1,
  sender: 'Example',
  receiver: 'Example',
  count: 1000000,
  title: 'Example',
  description: 'Example',
  category: 'Example',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
