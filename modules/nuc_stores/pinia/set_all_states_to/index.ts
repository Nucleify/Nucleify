import type { StoreStateKeyType, StoreStatesInterface } from 'atomic'

export function setAllStatesTo<T>(
  states: StoreStatesInterface<T>,
  value: T
): StoreStatesInterface<T> {
  return (Object.keys(states) as StoreStateKeyType[]).reduce(
    (
      newStates: StoreStatesInterface<T>,
      key: StoreStateKeyType
    ): StoreStatesInterface<T> => {
      newStates[key] = value
      return newStates
    },
    {} as StoreStatesInterface<T>
  )
}
