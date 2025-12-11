import * as atomic from 'atomic'

export const testCases: {
  value: atomic.StoreStateType
  description: string
}[] = [
  { value: true, description: 'true' },
  { value: false, description: 'false' },
]
