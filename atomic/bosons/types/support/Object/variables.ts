import { Ref } from 'vue'

import {
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  MoneyInterface,
  QuestionInterface,
  TechnologyInterface,
  UserInterface,
} from 'atomic'

export type ObjectType =
  | ActivityLogInterface
  | ArticleInterface
  | ContactInterface
  | MoneyInterface
  | QuestionInterface
  | TechnologyInterface
  | UserInterface
  | undefined

export type ObjectNameType =
  | 'activity'
  | 'article'
  | 'contact'
  | 'money'
  | 'user'
  | 'question'
  | 'technology'

export type SelectedObjectType = Ref<ObjectType>
