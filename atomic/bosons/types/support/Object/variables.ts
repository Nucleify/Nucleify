import { Ref } from 'vue'

import {
  ActivityLogInterface,
  ArticleInterface,
  StructuralCardInterface,
  ContactInterface,
  MoneyInterface,
  QuestionInterface,
  TechnologyInterface,
  UserInterface,
} from 'atomic'

export type ObjectType =
  | ActivityLogInterface
  | ArticleInterface
  | StructuralCardInterface
  | ContactInterface
  | MoneyInterface
  | QuestionInterface
  | TechnologyInterface
  | UserInterface
  | undefined

export type ObjectNameType =
  | 'activity'
  | 'article'
  | 'card'
  | 'contact'
  | 'money'
  | 'user'
  | 'question'
  | 'technology'

export type SelectedObjectType = Ref<ObjectType>
