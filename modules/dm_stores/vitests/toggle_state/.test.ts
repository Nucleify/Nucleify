import { describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

import { testCases } from './cases'

describe('toggleState', (): void => {
  testCases.forEach(({ value, description }): void => {
    it(description, (): void => {
      if (typeof value === 'boolean') {
        expect(atomic.toggleState(value)).toBe(!value)
      } else {
        expect(atomic.toggleState(value)).toBe(value)
      }
    })
  })
})
