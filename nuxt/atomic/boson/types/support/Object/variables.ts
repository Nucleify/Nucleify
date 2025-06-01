import type { Ref } from 'vue'

import type {
  ActivityLogObjectInterface,
  ArticleObjectInterface,
  CardObjectInterface,
  ContactObjectInterface,
  FeatureObjectInterface,
  LinkObjectInterface,
  MoneyObjectInterface,
  QuestionObjectInterface,
  TechnologyObjectInterface,
  UserObjectInterface,
} from 'atomic'

export type ObjectType =
  | ActivityLogObjectInterface
  | ArticleObjectInterface
  | CardObjectInterface
  | ContactObjectInterface
  | FeatureObjectInterface
  | LinkObjectInterface
  | MoneyObjectInterface
  | QuestionObjectInterface
  | TechnologyObjectInterface
  | UserObjectInterface
  | undefined

export type ObjectNameType =
  | 'activity'
  | 'article'
  | 'card'
  | 'contact'
  | 'feature'
  | 'link'
  | 'money'
  | 'user'
  | 'question'
  | 'technology'

export type SelectedObjectType = Ref<ObjectType>
