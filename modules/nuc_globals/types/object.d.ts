import type { Ref } from 'vue'

import type {
  NucActivityObjectInterface,
  NucArticleObjectInterface,
  NucCardObjectInterface,
  NucContactObjectInterface,
  NucDocumentationObjectInterface,
  NucFeatureObjectInterface,
  NucFileObjectInterface,
  NucLinkObjectInterface,
  NucMoneyObjectInterface,
  NucQuestionObjectInterface,
  NucTaskObjectInterface,
  NucTechnologyObjectInterface,
  NucUserObjectInterface,
} from 'atomic'

export {}

declare global {
  type ObjectType =
    | NucActivityObjectInterface
    | NucArticleObjectInterface
    | NucCardObjectInterface
    | NucContactObjectInterface
    | NucDocumentationObjectInterface
    | NucFeatureObjectInterface
    | NucFileObjectInterface
    | NucLinkObjectInterface
    | NucMoneyObjectInterface
    | NucQuestionObjectInterface
    | NucTaskObjectInterface
    | NucTechnologyObjectInterface
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
