import type { StoreStateKeyType } from './variables'

export interface StoreStatesInterface<T> {
  [key: StoreStateKeyType]: T
}
