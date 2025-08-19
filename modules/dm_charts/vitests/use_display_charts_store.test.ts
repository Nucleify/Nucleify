import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('useDisplayChartsStore', (): void => {
  let store: atomic.DMDisplayChartsStateInterface
  let keys: atomic.DMDisplayChartsStateKeyType[]

  beforeEach((): void => {
    setActivePinia(createPinia())

    store = atomic.useDisplayChartsStore()
    keys = Object.keys(store.$state)
  })

  it('initializes with all charts display enabled', (): void => {
    for (const key of keys) {
      expect(store[key]).toBe(true)
    }
  })

  it('toggles a single chart display', (): void => {
    for (const key of keys) {
      expect(store[key]).toBe(true)

      store.toggle(key)

      expect(store[key]).toBe(false)

      store.toggle(key)

      expect(store[key]).toBe(true)
    }
  })

  it('sets all charts display to true', (): void => {
    for (const key of keys) {
      expect(store[key]).toBe(true)

      store.toggle(key)

      expect(store[key]).toBe(false)
    }

    store.setAllTrue()

    for (const key of keys) {
      expect(store[key]).toBe(true)
    }
  })
})
