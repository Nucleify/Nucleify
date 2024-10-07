import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import { mockUser, mockUseToast } from 'atomic/bosons/constants'
import {
    UserInterface,
    UserRequestsInterface,
    EntityResponseType,
    MockUseToastInterface,
} from 'atomic/bosons/types'
import { useDialog, userRequests } from 'atomic/bosons/utils'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
    useToast: () => mockUseToast(vi.fn()),
}))

describe('userRequests', (): void => {
    const { closeDialog } = useDialog()
    const requests: UserRequestsInterface = userRequests(closeDialog)
    const mockResponse: EntityResponseType<UserInterface[]> = {
        data: [mockUser],
    }

    beforeEach((): void => {
        vi.clearAllMocks()
        axios.get.mockResolvedValue(mockResponse)
        axios.post.mockResolvedValue(mockResponse)
        axios.put.mockResolvedValue(mockResponse)
        axios.delete.mockResolvedValue(mockResponse)
    })

    it('getAllUsers', async (): Promise<void> => {
        await requests.getAllUsers()

        expect(axios.get).toHaveBeenCalledWith('/api/users')
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('storeUser', async (): Promise<void> => {
        await requests.storeUser(mockUser, requests.getAllUsers, closeDialog)

        expect(axios.post).toHaveBeenCalledWith('/api/users', {
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
        })

        expect(axios.get).toHaveBeenCalled()
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('editUser', async (): Promise<void> => {
        await requests.editUser(mockUser, requests.getAllUsers, closeDialog)

        expect(axios.put).toHaveBeenCalledWith(`/api/users/${mockUser.id}`, {
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
        })

        expect(axios.get).toHaveBeenCalled()
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('deleteUser', async (): Promise<void> => {
        await requests.deleteUser(
            mockUser.id,
            requests.getAllUsers,
            closeDialog
        )

        expect(axios.delete).toHaveBeenCalledWith(`/api/users/${mockUser.id}`)
        expect(axios.get).toHaveBeenCalledWith('/api/users')
        expect(mockUseToast.success)
    })
})
