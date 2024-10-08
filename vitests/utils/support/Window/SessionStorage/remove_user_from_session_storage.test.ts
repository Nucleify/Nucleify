import { it, expect, beforeEach } from 'vitest'

import { mockUser } from 'atomic/bosons/constants'
import { removeUserFromSessionStorage } from 'atomic/bosons/utils'

beforeEach((): void => {
    window.sessionStorage.clear()
})

it('should remove user data from sessionStorage', (): void => {
    Object.keys(mockUser).forEach((key): void => {
        window.sessionStorage.setItem(`user_${key}`, mockUser[key])
    })

    removeUserFromSessionStorage()

    Object.keys(mockUser).forEach((key): void => {
        expect(window.sessionStorage.getItem(`user_${key}`)).toBeNull()
    })
})
