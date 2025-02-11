import { Ref } from 'vue'

import {
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  MoneyInterface,
  UserInterface,
  QuestionInterface,
} from 'atomic'

export type ObjectType =
  | ActivityLogInterface
  | ArticleInterface
  | ContactInterface
  | MoneyInterface
  | UserInterface
  | QuestionInterface
  | undefined

export type ObjectNameType =
  | 'activity'
  | 'article'
  | 'contact'
  | 'money'
  | 'user'
  | 'question'

export type SelectedObjectType = Ref<ObjectType>
