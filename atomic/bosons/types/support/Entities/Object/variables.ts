import { Ref } from 'vue'

import {
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  UserInterface,
} from 'atomic/bosons/types'

export type ObjectType =
  | ActivityLogInterface
  | ArticleInterface
  | ContactInterface
  | UserInterface
  | undefined

export type ObjectNameType = 'activity' | 'article' | 'contact' | 'user'

export type SelectedObjectType = Ref<ObjectType>
