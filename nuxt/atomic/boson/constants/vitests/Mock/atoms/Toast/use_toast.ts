import type { MockUseToastInterface } from 'atomic'

// biome-ignore lint/suspicious/noExplicitAny: fix in future
export const mockUseToast = (fn: any): MockUseToastInterface => {
  return {
    add: fn,
    success: fn,
    error: fn,
    clear: fn,
  }
}
