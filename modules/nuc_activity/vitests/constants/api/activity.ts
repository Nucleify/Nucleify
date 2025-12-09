import type { NucActivityObjectInterface } from 'atomic'

export const mockActivity: NucActivityObjectInterface = {
  id: 999999,
  causer_id: 1,
  description: 'User created a new article.',
  created_at: new Date().toISOString(),
}
