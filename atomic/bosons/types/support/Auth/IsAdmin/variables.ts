import { Ref } from 'vue'

export type IsAdminType = Ref | null
export type IsAdminFunctionType = Promise<{ isAdmin: Ref<boolean> }>
