export interface QuestionInterface {
  id?: number
  user_id?: number
  index: number
  content: string
  answer: string
  category: string
  on_site?: boolean
  display?: boolean
  created_at?: string
  updated_at?: string
}
