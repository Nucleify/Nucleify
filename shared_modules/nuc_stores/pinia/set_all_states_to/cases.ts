import * as nucleify from 'nucleify'

export const testCases: {
  value: nucleify.StoreStateType
  description: string
}[] = [
  { value: true, description: 'true' },
  { value: false, description: 'false' },
  { value: undefined, description: 'undefined' },
  { value: null, description: 'null' },
  { value: 1, description: 'number' },
  { value: 'value', description: 'string' },
  { value: { value1: 1, value2: 2 }, description: 'object' },
  { value: [1, 2], description: 'array' },
]
