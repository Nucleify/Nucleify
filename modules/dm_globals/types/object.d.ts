import type { Ref } from 'vue'

import type {
  NucActivityObjectInterface,
  ArticleObjectInterface,
  CardObjectInterface,
  ContactObjectInterface,
  DocumentationObjectInterface,
  FeatureObjectInterface,
  FileObjectInterface,
  LinkObjectInterface,
  MoneyObjectInterface,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
  UserObjectInterface,
} from 'atomic'

export {}

declare global {
  type ObjectType =
    | NucActivityObjectInterface
    | ArticleObjectInterface
    | CardObjectInterface
    | ContactObjectInterface
    | DocumentationObjectInterface
    | FeatureObjectInterface
    | FileObjectInterface
    | LinkObjectInterface
    | MoneyObjectInterface
    | QuestionObjectInterface
    | TaskObjectInterface
    | TechnologyObjectInterface
    | UserObjectInterface
    | undefined

  type ObjectNameType =
    | 'activity'
    | 'article'
    | 'card'
    | 'contact'
    | 'documentation'
    | 'feature'
    | 'file'
    | 'link'
    | 'money'
    | 'question'
    | 'task'
    | 'technology'
    | 'user'

  type SelectedObjectType = Ref<ObjectType>
}
