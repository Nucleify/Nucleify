import { describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('initialStoreState', (): void => {
  const keys: atomic.StoreKeyType[] = ['one', 'two']
  let initialState: atomic.StoreStateType

  it('returns empty state when no keys are provided', (): void => {
    const state = atomic.initialStoreState<atomic.StoreStateType>([], false)

    expect(Object.keys(state)).toHaveLength(0)
  })

  it('returns state with keys set to true', (): void => {
    initialState = true

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    expect(Object.keys(state)).toHaveLength(keys.length)

    for (const key of keys) {
      expect(state[key]).toBe(initialState)
    }
  })

  it('returns state with keys set to false', (): void => {
    initialState = false

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    expect(Object.keys(state)).toHaveLength(keys.length)

    for (const key of keys) {
      expect(state[key]).toBe(initialState)
    }
  })

  it('returns state with keys set to number', (): void => {
    initialState = 1

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    for (const key of keys) {
      expect(state[key]).toBe(initialState)
    }
  })

  it('returns state with keys set to string', (): void => {
    initialState = 'value'

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    for (const key of keys) {
      expect(state[key]).toBe(initialState)
    }
  })

  it('returns state with keys set to object', (): void => {
    initialState = { value1: 1, value2: 2 }

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    for (const key of keys) {
      expect(state[key]).toBe(initialState)
    }
  })

  it('returns state with keys set to array', (): void => {
    initialState = [1, 2]

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    for (const key of keys) {
      expect(state[key]).toBe(initialState)
    }
  })

  it('returns state with keys set to undefined', (): void => {
    initialState = undefined

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    for (const key of keys) {
      expect(state[key]).toBeUndefined()
    }
  })

  it('returns state with keys set to null', (): void => {
    initialState = null

    const state = atomic.initialStoreState<atomic.StoreStateType>(
      keys,
      initialState
    )

    for (const key of keys) {
      expect(state[key]).toBeNull()
    }
  })
})
