import { ActivityLogInterface } from 'atomic'

export const mockActivity: ActivityLogInterface = {
  id: 999999,
  causer_id: window.sessionStorage.getItem('user_id'),
  description: 'User created a new article.',
  created_at: new Date().toISOString(),
}
