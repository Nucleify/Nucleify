import type { ErrorResponseInterface } from './variables'

export type ApiErrorsFunctionType = (
  error: ErrorResponseInterface | Error | unknown
) => void
