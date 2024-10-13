import { Ref } from 'vue'

import { UserInterface } from 'atomic/bosons/types'

export type UserIdType = string | null
export type UserResultsType = Ref<UserInterface[] | undefined>
export type UserRoleType =
    | 'super_admin'
    | 'admin'
    | 'test_admin'
    | 'test_tech'
    | 'test_user'
    | 'user'
