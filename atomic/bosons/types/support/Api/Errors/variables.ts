import { MessageOrMessagesType } from 'atomic/bosons/types'

export interface ErrorResponseInterface {
  response: {
    status: number
    data: {
      error?: string
      errors: MessageOrMessagesType
    }
  }
}
