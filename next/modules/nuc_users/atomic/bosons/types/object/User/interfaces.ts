export interface NucUserObjectInterface {
  id?: number
  name: string
  email: string
  phone_number?: string
  avatar?: string | null
  language?: string
  country?: string
  role: string
  password?: string
  confirm_password?: string
  created_at?: string
  updated_at?: string
  email_verified_at?: string
}
