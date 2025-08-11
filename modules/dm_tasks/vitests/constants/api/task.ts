import type { TaskObjectInterface } from 'atomic'

export const mockTask: TaskObjectInterface = {
  id: 99,
  user_id: 1,
  assignee_id: 2,
  collaborator_ids: [3, 4],
  title: 'Mock Task',
  description: 'This is a mock task for testing purposes.',
  start_date: '2023-10-01',
  end_date: '2023-10-31',
  created_at: '2023-10-01T12:00:00Z',
  updated_at: '2023-10-01T12:00:00Z',
}
