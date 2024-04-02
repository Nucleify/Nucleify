import { Ref } from 'vue'

import { ActivityLogInterface, ContactInterface, UserInterface } from './'

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
export type MessageOrMessagesType = string | Record<string, string[]>
export type ObjectType =
    | ActivityLogInterface
    | ContactInterface
    | UserInterface
    | undefined
export type ToastSeverityType =
    | 'success'
    | 'info'
    | 'warn'
    | 'error'
    | undefined
