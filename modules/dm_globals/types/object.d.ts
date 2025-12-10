import type { Ref } from 'vue'

import type {
  NucActivityObjectInterface,
  NucArticleObjectInterface,
  CardObjectInterface,
  NucContactObjectInterface,
  NucDocumentationObjectInterface,
  FeatureObjectInterface,
  FileObjectInterface,
  LinkObjectInterface,
  NucMoneyObjectInterface,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
  NucUserObjectInterface,
} from 'atomic'

export {}

declare global {
  type ObjectType =
    | NucActivityObjectInterface
    | NucArticleObjectInterface
    | CardObjectInterface
    | NucContactObjectInterface
    | NucDocumentationObjectInterface
    | FeatureObjectInterface
    | FileObjectInterface
    | LinkObjectInterface
    | NucMoneyObjectInterface
    | QuestionObjectInterface
    | TaskObjectInterface
    | TechnologyObjectInterface
    | NucUserObjectInterface
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
