import { MoneyInterface } from 'atomic'

export const mockMoney: MoneyInterface = {
  id: 999999,
  user_id: Number(window.sessionStorage.getItem('user_id')),
  sender: 'Example',
  receiver: 'Example',
  count: 1000000,
  title: 'Example',
  description: 'Example',
  category: 'Example',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
