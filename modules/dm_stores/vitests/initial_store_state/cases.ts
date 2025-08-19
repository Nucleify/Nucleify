import * as atomic from 'atomic'

export const testCases: {
  value: atomic.StoreStateType
  description: string
}[] = [
  { value: [], description: 'empty' },
  { value: true, description: 'true' },
  { value: false, description: 'false' },
  { value: 1, description: 'number' },
  { value: 'value', description: 'string' },
  { value: { value1: 1, value2: 2 }, description: 'object' },
  { value: [1, 2], description: 'array' },
  { value: undefined, description: 'undefined' },
  { value: null, description: 'null' },
]
