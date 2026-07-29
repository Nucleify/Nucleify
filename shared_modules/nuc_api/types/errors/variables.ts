export type MessageOrMessagesType = string | Record<string, string[]>

export interface ErrorResponseInterface {
  response: {
    status: number
    data: {
      error?: string
      errors: MessageOrMessagesType
    }
  }
}
