import { MockUseToastInterface } from 'atomic'

// eslint-disable-next-line
export const mockUseToast = (fn: any): MockUseToastInterface => {
  return {
    add: fn,
    success: fn,
    error: fn,
    clear: fn,
  }
}
