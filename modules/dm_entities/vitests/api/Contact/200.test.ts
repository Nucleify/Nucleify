import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockContact,
  contactRequests,
  mockGlobalFetch,
  useDialog,
  ContactRequestsInterface,
} from 'atomic'

describe('contactRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: ContactRequestsInterface = contactRequests(closeDialog)
  const mockResponse = [mockContact]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllContacts', async (): Promise<void> => {
    await requests.getAllContacts()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('contacts'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('storeContact', async (): Promise<void> => {
    await requests.storeContact(mockContact, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('contacts'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editContact', async (): Promise<void> => {
    await requests.editContact(mockContact, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('contacts'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deleteContact', async (): Promise<void> => {
    await requests.deleteContact(mockContact.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('contacts'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
