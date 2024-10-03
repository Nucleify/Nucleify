import { Ref } from 'vue'

import { UserInterface } from 'atomic/bosons/types'

export type UserIdType = string | null
export type UserResultsType = Ref<UserInterface[] | undefined>
