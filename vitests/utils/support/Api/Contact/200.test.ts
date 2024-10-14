import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import { mockContact, mockUseToast } from 'atomic/bosons/constants'
import {
    ContactInterface,
    ContactRequestsInterface,
    EntityResponseType,
    MockUseToastInterface,
} from 'atomic/bosons/types'
import { contactRequests, useDialog } from 'atomic/bosons/utils'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
    useToast: () => mockUseToast(vi.fn()),
}))

describe('contactRequests', (): void => {
    const { closeDialog } = useDialog()
    const requests: ContactRequestsInterface = contactRequests(closeDialog)
    const mockResponse: EntityResponseType<ContactInterface[]> = {
        data: [mockContact],
    }

    beforeEach((): void => {
        vi.clearAllMocks()
        axios.get.mockResolvedValue(mockResponse)
        axios.post.mockResolvedValue(mockResponse)
        axios.put.mockResolvedValue(mockResponse)
        axios.delete.mockResolvedValue(mockResponse)
    })

    it('getAllContacts', async (): Promise<void> => {
        await requests.getAllContacts()

        expect(axios.get).toHaveBeenCalledWith('/api/contacts')
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('storeContact', async (): Promise<void> => {
        await requests.storeContact(
            mockContact,
            requests.getAllContacts(),
            close
        )

        expect(axios.post).toHaveBeenCalledWith('/api/contacts', {
            user_id: window.sessionStorage.getItem('user_id'),
            first_name: mockContact.first_name,
            last_name: mockContact.last_name,
            email: mockContact.email,
            personal_phone: mockContact.personal_phone,
            work_phone: mockContact.work_phone,
            address: mockContact.address,
            birthday: mockContact.birthday,
            contact_groups: mockContact.contact_groups,
            role: mockContact.role,
        })

        expect(axios.get).toHaveBeenCalled()
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('editContact', async (): Promise<void> => {
        await requests.editContact(
            mockContact,
            requests.getAllContacts(),
            close
        )

        expect(axios.put).toHaveBeenCalledWith(
            `/api/contacts/${mockContact.id}`,
            {
                first_name: mockContact.first_name,
                last_name: mockContact.last_name,
                email: mockContact.email,
                personal_phone: mockContact.personal_phone,
                work_phone: mockContact.work_phone,
                address: mockContact.address,
                birthday: mockContact.birthday,
                contact_groups: mockContact.contact_groups,
                role: mockContact.role,
            }
        )

        expect(axios.get).toHaveBeenCalled()
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('deleteContact', async (): Promise<void> => {
        await requests.deleteContact(
            mockContact.id,
            requests.getAllContacts(),
            close
        )
        expect(axios.delete).toHaveBeenCalledWith(
            `/api/contacts/${mockContact.id}`
        )
        expect(axios.get).toHaveBeenCalledWith('/api/contacts')
        expect(mockUseToast.success)
    })
})
