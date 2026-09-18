import { humanizeSupabaseError } from 'nucleify'

export function resolveErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    if ('data' in error) {
      const data = (error as { data?: { error?: string; errors?: string } })
        .data
      if (data?.error) return humanizeSupabaseError(data.error)
      if (data?.errors) return humanizeSupabaseError(data.errors)
    }

    if (error instanceof Error && error.message) {
      return humanizeSupabaseError(error.message)
    }
  }

  if (typeof error === 'string' && error) {
    return humanizeSupabaseError(error)
  }

  return 'An unknown error occurred'
}
