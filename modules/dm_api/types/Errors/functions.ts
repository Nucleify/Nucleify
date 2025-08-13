import type { ErrorResponseInterface } from 'atomic'

export type ApiErrorsFunctionType = (
  error: ErrorResponseInterface | Error | unknown
) => void
