import { ErrorResponseInterface } from 'atomic'

export type ApiErrorsFunctionType = (
  error: ErrorResponseInterface | Error | unknown
) => void
