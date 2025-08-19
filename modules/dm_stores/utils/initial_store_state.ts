import type { StoreKeyType, StoreStatesInterface } from 'atomic'

export function initialStoreState<T>(
  keys: StoreKeyType[],
  initialValue: T
): StoreStatesInterface<T> {
  const state: StoreStatesInterface<T> = {} as StoreStatesInterface<T>

  keys.forEach((key: StoreKeyType): void => {
    state[key] = initialValue
  })

  return state
}
