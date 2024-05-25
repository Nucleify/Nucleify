import { Ref } from 'vue'

import {
    ActivityLogInterface,
    ArticleInterface,
    ContactInterface,
    UserInterface,
} from '@/types'

export type ChartMethodType = 'annual' | 'count'
export type ChartType =
    | 'bar'
    | 'pie'
    | 'doughnut'
    | 'line'
    | 'polarArea'
    | 'radar'
export type CSRFTokenType = string | null | undefined
export type CSRFTokenInputType = LogoutFormType | undefined
export type IsAdminType = Ref | null
export type LabelItemType = string | null
export type LogoutFormType = HTMLFormElement | null
export type LoadingType = Ref<boolean>
export type MessageOrMessagesType = string | Record<string, string[]>
export type ObjectType =
    | ActivityLogInterface
    | ArticleInterface
    | ContactInterface
    | UserInterface
    | undefined
export type SelectedObjectType = Ref<ObjectType>
export type ToastSeverityType =
    | 'success'
    | 'info'
    | 'warn'
    | 'error'
    | undefined
export type UserIdType = string | null
export type UserRoleType = string
export type TimeoutType = number
export type VisibleType = Ref<boolean>

/**
 *  Results
 */
export type ActivityResultsType = Ref<ActivityLogInterface[] | undefined>
export type ArticleResultsType = Ref<ArticleInterface[] | undefined>
export type ContactResultsType = Ref<ContactInterface[] | undefined>
export type UserResultsType = Ref<UserInterface[] | undefined>
