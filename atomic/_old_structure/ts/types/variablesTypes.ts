import { Ref } from 'vue'

import {
    ActivityLogInterface,
    ArticleInterface,
    ContactInterface,
    UserInterface,
} from '@/types'

export type IsAdminType = Ref | null
export type LabelItemType = string | null
export type LoadingType = Ref<boolean>
export type MessageOrMessagesType = string | Record<string, string[]>
export type ObjectType =
    | ActivityLogInterface
    | ArticleInterface
    | ContactInterface
    | UserInterface
    | undefined
export type SelectedObjectType = Ref<ObjectType>

export type UserIdType = string | null
export type TimeoutType = number
export type VisibleType = Ref<boolean>

/**
 *  Results
 */
export type ActivityResultsType = Ref<ActivityLogInterface[] | undefined>
export type ArticleResultsType = Ref<ArticleInterface[] | undefined>
export type ContactResultsType = Ref<ContactInterface[] | undefined>
export type UserResultsType = Ref<UserInterface[] | undefined>
