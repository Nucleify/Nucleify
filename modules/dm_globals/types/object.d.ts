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

export {}

declare global {
  type ObjectType =
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

  type ObjectNameType =
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

  type SelectedObjectType = Ref<ObjectType>
}
