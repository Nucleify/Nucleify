import { ref } from 'vue'

import { IsAdminType, UserIdType, UserInterface } from '@/types'
import { setUserToSessionStorage, userApiMethods } from '@/utils'

export default async function useIsAdmin() {
    const isAdmin: IsAdminType = ref(null)
    const user_id: UserIdType = window.sessionStorage.getItem('user_id')

    const { getUser } = userApiMethods()

    if (!user_id) {
        await getUser().then((user: void | UserInterface) => {
            if (user) {
                setUserToSessionStorage(user)
            }
        })
    }

    let userRole = window.sessionStorage.getItem('user_role') ?? ''
    isAdmin.value =
        userRole === 'admin' ||
        userRole === 'test_admin' ||
        userRole === 'super_admin'

    return { isAdmin }
}
