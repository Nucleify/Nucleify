import { MessageOrMessagesType } from 'atomic'

export interface ErrorResponseInterface {
  response: {
    status: number
    data: {
      error?: string
      errors: MessageOrMessagesType
    }
  }
}
