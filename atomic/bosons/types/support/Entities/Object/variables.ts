import { Ref } from 'vue'

import {
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  MoneyInterface,
  UserInterface,
} from 'atomic'

export type ObjectType =
  | ActivityLogInterface
  | ArticleInterface
  | ContactInterface
  | MoneyInterface
  | UserInterface
  | undefined

export type ObjectNameType =
  | 'activity'
  | 'article'
  | 'contact'
  | 'money'
  | 'user'

export type SelectedObjectType = Ref<ObjectType>
