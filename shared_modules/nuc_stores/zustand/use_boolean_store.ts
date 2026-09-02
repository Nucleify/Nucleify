import type { StoreStateKeyType } from 'nucleify'

import { create } from 'zustand'

interface BooleanStoreActions<K extends string> {
  toggle: (key: K) => void
  setAllTo: (value: boolean) => void
}

type BooleanStateMap<K extends string> = Record<K, boolean>

export type BooleanStoreInterface<K extends string> = BooleanStateMap<K> &
  BooleanStoreActions<K>

function buildInitialState<K extends string>(
  keys: K[],
  value: boolean
): BooleanStateMap<K> {
  return keys.reduce(
    (state, key) => {
      state[key] = value
      return state
    },
    {} as BooleanStateMap<K>
  )
}

export function useBooleanStore<K extends StoreStateKeyType>(
  keys: K[],
  initialValue: boolean = true
) {
  return create<BooleanStoreInterface<K>>((set) => ({
    ...buildInitialState(keys, initialValue),
    toggle: (key) =>
      set(
        (state) =>
          ({
            [key]: !state[key],
          }) as Partial<BooleanStoreInterface<K>>
      ),
    setAllTo: (value) =>
      set(
        () =>
          buildInitialState(keys, value) as Partial<BooleanStoreInterface<K>>
      ),
  }))
}
