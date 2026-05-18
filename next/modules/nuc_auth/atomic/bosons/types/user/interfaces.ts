export interface NucAuthUserInterface {
  id?: number | string
  name?: string
  email?: string
  phone_number?: string
  language?: string
  country?: string
  role?: string
  created_at?: string
  updated_at?: string
  email_verified_at?: string | null
  avatar?: string
  [key: string]: string | number | null | undefined
}
