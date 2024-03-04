import { Ref } from 'vue'

export type MessageOrMessagesType = string | Record<string, string[]>

export type IsAdminType = Ref | null

export type ToastSeverityType = | 'success' | 'info' | 'warn' | 'error' | undefined
