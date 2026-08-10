import { describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'

import { testCases } from './cases'

describe('setAllStatesTo', (): void => {
  testCases.forEach(({ value, description }): void => {
    it(description, (): void => {
      expect(
        nucleify.setAllStatesTo(nucleify.initialStoreState([], value), value)
      ).toEqual(nucleify.initialStoreState([], value))
    })
  })
})
