import { Ref } from 'vue'
import { ContactInterface, UserInterface } from "./index"


export type MessageOrMessagesType = string | Record<string, string[]>

export type IsAdminType = Ref | null

export type ToastSeverityType = | 'success' | 'info' | 'warn' | 'error' | undefined

export type ObjectType = UserInterface | ContactInterface | undefined
