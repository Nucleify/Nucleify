import type { ChartProps } from 'primereact/chart'

import type { NucDisplayChartsStateKeyType } from './variables'

export interface NucDisplayChartsStateInterface
  extends Partial<Record<NucDisplayChartsStateKeyType, boolean>> {}

export interface ChartSettingsGroupInterface {
  name?: string
  items?: string[]
}

export interface ChartInterface extends Omit<ChartProps, 'width' | 'height'> {
  width?: string | number
  height?: string | number
  chartClass?: string
}

export type ChartMethodType = 'annual' | 'count' | 'annual-stacked'

export interface NucActivityObjectInterface {
  id: number
  description: string
  created_at: string
  causer_id: number
}

export interface NucArticleObjectInterface {
  id?: number
  user_id?: number
  title: string
  description: string
  created_at?: string
  updated_at?: string
  category: string
}

export interface NucContactObjectInterface {
  id?: number
  user_id?: number
  first_name: string
  last_name?: string
  full_name?: string
  email: string
  personal_phone?: string
  work_phone?: string
  address?: string
  birthday?: string
  contact_groups?: string
  role?: string
  created_at?: string
  updated_at?: string
}

export interface NucFileObjectInterface {
  id?: number
  user_id: number
  path: string
  mime_type: string
  size: string
  created_at?: string
  updated_at?: string
}

export interface NucMoneyObjectInterface {
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

export interface NucQuestionObjectInterface {
  id?: number
  index: number
  content: string
  answer: string
  category: string
  on_site?: boolean
  display?: boolean
  created_at?: string
  updated_at?: string
}

export interface NucTechnologyObjectInterface {
  id?: number
  href?: string
  src?: string
  label?: string
  description?: string
  category?: string
  display?: boolean
  created_at?: string
  updated_at?: string
  prefix?: string
}

export interface NucUserObjectInterface {
  id?: number
  name: string
  email: string
  role: string
  password?: string
  confirm_password?: string
  created_at?: string
  updated_at?: string
  email_verified_at?: string
}
