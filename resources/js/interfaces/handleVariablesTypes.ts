import { Ref } from 'vue'
import { ContactInterface, UserInterface } from "./index"

export type ChartMethodType = 'annual' | 'count'
export type ChartType = 'bar' | 'pie' | 'doughnut' | 'line' | 'polarArea' | 'radar'
export type IsAdminType = Ref | null
export type MessageOrMessagesType = string | Record<string, string[]>
export type ObjectType = UserInterface | ContactInterface | undefined
export type ToastSeverityType = 'success' | 'info' | 'warn' | 'error' | undefined
