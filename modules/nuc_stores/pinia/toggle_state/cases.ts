import * as atomic from 'atomic'

export const testCases: {
  value: atomic.StoreStateType
  description: string
}[] = [
  { value: true, description: 'toggles > true' },
  { value: false, description: 'toggles > false' },
  { value: undefined, description: "can't toggle > undefined" },
  { value: null, description: "can't toggle > null" },
  { value: 1, description: "can't toggle > number" },
  { value: 'value', description: "can't toggle > string" },
  { value: { value1: 1, value2: 2 }, description: "can't toggle > object" },
  { value: [1, 2], description: "can't toggle > array" },
]
