import { describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

import { testCases } from './cases'

describe('setAllStatesTo', (): void => {
  testCases.forEach(({ value, description }): void => {
    it(description, (): void => {
      expect(
        atomic.setAllStatesTo(atomic.initialStoreState([], value), value)
      ).toEqual(atomic.initialStoreState([], value))
    })
  })
})
