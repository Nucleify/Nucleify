import { it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'

import { useThrottle } from 'atomic/bosons/utils'

beforeEach((): void => {
    vi.useFakeTimers()
    vi.clearAllTimers()
})

it('throttles the callback execution', async (): Promise<void> => {
    const { throttle, isThrottled } = useThrottle()
    const mockCallback = vi.fn()

    throttle(mockCallback, 100)

    expect(isThrottled.value).toBe(true)
    expect(mockCallback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    await nextTick()

    expect(mockCallback).toHaveBeenCalled()
    expect(isThrottled.value).toBe(true)
})
