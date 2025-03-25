import { Ref } from 'vue'

import {
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  FeatureInterface,
  LinkInterface,
  MoneyInterface,
  QuestionInterface,
  TechnologyInterface,
  UserInterface,
} from 'atomic'

export type ObjectType =
  | ActivityLogInterface
  | ArticleInterface
  | ContactInterface
  | FeatureInterface
  | LinkInterface
  | MoneyInterface
  | QuestionInterface
  | TechnologyInterface
  | UserInterface
  | undefined

export type ObjectNameType =
  | 'activity'
  | 'article'
  | 'contact'
  | 'feature'
  | 'link'
  | 'money'
  | 'user'
  | 'question'
  | 'technology'

export type SelectedObjectType = Ref<ObjectType>
