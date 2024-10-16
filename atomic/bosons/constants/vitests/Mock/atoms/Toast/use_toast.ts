import { MockUseToastInterface } from 'atomic/bosons/types'

export const mockUseToast = (fn): MockUseToastInterface => {
  return {
    add: fn,
    success: fn,
    error: fn,
    clear: fn,
  }
}
