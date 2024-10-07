import { it, expect, beforeEach } from 'vitest'

import { useLoading } from 'atomic/bosons/utils'

let loadingInstance: ReturnType<typeof useLoading>

beforeEach((): void => {
    loadingInstance = useLoading()
})

it('should initialize loading state as false', (): void => {
    expect(loadingInstance.loading.value).toBe(false)
})

it('should set loading state to true', (): void => {
    loadingInstance.setLoading(true)
    expect(loadingInstance.loading.value).toBe(true)
})

it('should set loading state to false', (): void => {
    loadingInstance.setLoading(false)
    expect(loadingInstance.loading.value).toBe(false)
})

it('should set loading state to true after a timeout', async (): Promise<void> => {
    loadingInstance.setLoading(true, 10)
    expect(loadingInstance.loading.value).toBe(false)

    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(loadingInstance.loading.value).toBe(true)
})

it('should set loading state to false after a timeout', async (): Promise<void> => {
    loadingInstance.setLoading(true)
    expect(loadingInstance.loading.value).toBe(true)

    loadingInstance.setLoading(false, 10)
    expect(loadingInstance.loading.value).toBe(true)

    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(loadingInstance.loading.value).toBe(false)
})
