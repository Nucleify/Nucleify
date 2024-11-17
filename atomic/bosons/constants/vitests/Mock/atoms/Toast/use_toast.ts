import { MockUseToastInterface } from 'atomic/bosons/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockUseToast = (fn: any): MockUseToastInterface => {
  return {
    add: fn,
    success: fn,
    error: fn,
    clear: fn,
  }
}
