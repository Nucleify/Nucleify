import type { StoreStateKeyType, StoreStatesInterface } from 'atomic'

export function initialStoreState<T>(
  keys: StoreStateKeyType[],
  initialValue: T
): StoreStatesInterface<T> {
  const state: StoreStatesInterface<T> = {} as StoreStatesInterface<T>

  keys.forEach((key: StoreStateKeyType): void => {
    state[key] = initialValue
  })

  return state
}
