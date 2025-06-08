import type { Ref } from 'vue'

export type EntityCountResultsType = Ref<number | undefined>
export type EntityResultsType<T> = Ref<T[] | undefined>
