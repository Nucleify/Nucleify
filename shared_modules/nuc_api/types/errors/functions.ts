import type { ErrorResponseInterface } from 'nucleify'

export type ApiErrorsFunctionType = (
  error: ErrorResponseInterface | Error | unknown
) => void
