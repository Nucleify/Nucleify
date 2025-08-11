export interface TaskObjectInterface {
  id?: number
  user_id: number
  assignee_id: number
  collaborator_ids: number[]
  title: string
  description: string
  start_date: string
  end_date: string
  created_at?: string
  updated_at?: string
}
