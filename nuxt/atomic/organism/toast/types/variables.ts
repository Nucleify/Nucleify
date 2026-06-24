export type MessageOrMessagesType = string | Record<string, string[]>

export type ToastSeverityType =
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | undefined

export type ToastPositionType =
  | 'center'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type FlashToastFunctionType = (
  messageOrMessages: MessageOrMessagesType,
  severity: ToastSeverityType,
  life?: number
) => void
