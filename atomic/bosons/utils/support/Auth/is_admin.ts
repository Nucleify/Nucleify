import { ref } from 'vue'

import {
    IsAdminFunctionType,
    IsAdminType,
    UserIdType,
    UserInterface,
} from 'atomic/bosons/types'
import { userRequests, setUserToSessionStorage } from 'atomic/bosons/utils'

export async function isAdmin(): IsAdminFunctionType {
    const isAdmin: IsAdminType = ref(null)
    const user_id: UserIdType = window.sessionStorage.getItem('user_id')

    const { getUser } = userRequests()

    if (!user_id) {
        await getUser().then((user: void | UserInterface): void => {
            if (user) {
                setUserToSessionStorage(user)
            }
        })
    }

    const userRole: string = window.sessionStorage.getItem('user_role') ?? ''
    isAdmin.value =
        userRole === 'admin' ||
        userRole === 'test_admin' ||
        userRole === 'super_admin'

    return { isAdmin }
}
