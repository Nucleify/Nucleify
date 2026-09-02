import type { StoreStateKeyType } from 'nucleify'

export interface StoreStatesInterface<T> {
  [key: StoreStateKeyType]: T
}
