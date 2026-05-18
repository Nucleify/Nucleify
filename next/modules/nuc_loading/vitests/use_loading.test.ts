import { describe, expect, it, vi } from 'vitest'

import { act, renderHook } from '@testing-library/react'
import { useLoading } from '../utils/use_loading'

describe('useLoading', (): void => {
  it('should initialize loading state as false', (): void => {
    const { result } = renderHook(() => useLoading())
    expect(result.current.loading).toBe(false)
  })

  it('should set loading state to true', (): void => {
    const { result } = renderHook(() => useLoading())
    act(() => {
      result.current.setLoading(true)
    })
    expect(result.current.loading).toBe(true)
  })

  it('should set loading state to false', (): void => {
    const { result } = renderHook(() => useLoading())
    act(() => {
      result.current.setLoading(true)
    })
    act(() => {
      result.current.setLoading(false)
    })
    expect(result.current.loading).toBe(false)
  })

  it('should set loading state to true after a timeout', (): void => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useLoading())

    act(() => {
      result.current.setLoading(true, 10)
    })
    expect(result.current.loading).toBe(false)

    act(() => {
      vi.advanceTimersByTime(10)
    })
    expect(result.current.loading).toBe(true)
    vi.useRealTimers()
  })

  it('should set loading state to false after a timeout', (): void => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useLoading())

    act(() => {
      result.current.setLoading(true)
    })
    expect(result.current.loading).toBe(true)

    act(() => {
      result.current.setLoading(false, 10)
    })
    expect(result.current.loading).toBe(true)

    act(() => {
      vi.advanceTimersByTime(10)
    })
    expect(result.current.loading).toBe(false)
    vi.useRealTimers()
  })
})
