import { describe, expect, it, vi } from 'vitest'

import { act, renderHook } from '@testing-library/react'
import { useThrottle } from '../utils/use_throttle'

describe('useThrottle', (): void => {
  it('throttles the callback execution', (): void => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useThrottle())
    const mockCallback = vi.fn()

    act(() => {
      result.current.throttle(mockCallback, 100)
    })

    expect(result.current.isThrottled).toBe(true)
    expect(mockCallback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(mockCallback).toHaveBeenCalled()
    expect(result.current.isThrottled).toBe(true)
    vi.useRealTimers()
  })
})
