import type {
  ApiResponseType,
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
} from 'nucleify'
import {
  apiHandle,
  apiRequest,
  sessionStorageGetItem,
  sessionStorageSetItem,
  useApiSuccess,
  useAtomicToast,
} from 'nucleify'

import type { NucUserRequestsInterface } from '../../types/api/User/interfaces'
import type { NucUserObjectInterface } from '../../types/object/User/interfaces'

type BooleanRef = { value: boolean }
type NullableStringRef = { value: string | null }
type FileInputRef = { value: HTMLInputElement | null }

function apiUrl(): string {
  return '/api'
}

async function getAndSetUser(): Promise<void> {
  try {
    const response = await apiRequest<NucUserObjectInterface>(
      `${apiUrl()}/user`
    )
    const payload = response as ApiResponseType<NucUserObjectInterface>
    const user = 'data' in payload ? payload.data : payload
    sessionStorageSetItem('user_name', user.name ?? '')
    sessionStorageSetItem('user_email', user.email ?? '')
    sessionStorageSetItem('user_role', user.role ?? 'user')
    sessionStorageSetItem('user_phone_number', user.phone_number ?? '')
    sessionStorageSetItem('user_language', user.language ?? 'en')
    sessionStorageSetItem('user_country', user.country ?? 'poland')
  } catch {
    // Keep current storage values when backend is unavailable.
  }
}

function removeUserFromSessionStorage(): void {
  if (typeof window === 'undefined') return
  const keys = [
    'user_id',
    'user_name',
    'user_email',
    'user_role',
    'user_phone_number',
    'user_language',
    'user_country',
    'user_created_at',
  ]
  keys.forEach((key) => sessionStorage.removeItem(key))
}

export function userRequests(
  close?: CloseDialogType
): NucUserRequestsInterface {
  let results: EntityResultsType<NucUserObjectInterface> = undefined
  let createdLastWeek: EntityCountResultsType = undefined
  let loading = false

  const { apiSuccess } = useApiSuccess()
  const { flashToast } = useAtomicToast()

  async function getAllUsers(withLoading?: boolean): Promise<void> {
    await apiHandle<NucUserObjectInterface[]>({
      url: `${apiUrl()}/users`,
      setLoading: withLoading
        ? (value: boolean) => {
            loading = value
          }
        : undefined,
      onSuccess: (response: NucUserObjectInterface[]) => {
        results = response
      },
    })
  }

  async function getCountUsersByCreatedLastWeek(
    withLoading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: `${apiUrl()}/users/count-by-created-last-week`,
      setLoading: withLoading
        ? (value: boolean) => {
            loading = value
          }
        : undefined,
      onSuccess: (response: number) => {
        createdLastWeek = response
      },
    })
  }

  async function getUser(withLoading?: boolean): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: `${apiUrl()}/user`,
      setLoading: withLoading
        ? (value: boolean) => {
            loading = value
          }
        : undefined,
      onSuccess: (response: NucUserObjectInterface) => {
        results = [response]
      },
    })
  }

  async function storeUser(
    data: NucUserObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: `${apiUrl()}/users`,
      method: 'POST',
      data,
      onSuccess: async (response: NucUserObjectInterface) => {
        await apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editUser(
    data: NucUserObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: `${apiUrl()}/users`,
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: async (response: NucUserObjectInterface) => {
        await apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteUser(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucUserObjectInterface>({
      url: `${apiUrl()}/users`,
      method: 'DELETE',
      id,
      onSuccess: async (response: NucUserObjectInterface) => {
        await apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  async function getAuthenticatedUser(): Promise<NucUserObjectInterface> {
    const response = await apiRequest<NucUserObjectInterface>(
      `${apiUrl()}/user`
    )
    const payload = response as ApiResponseType<NucUserObjectInterface>

    return 'data' in payload ? payload.data : payload
  }

  async function uploadUserAvatar(id: number, file: File): Promise<void> {
    const formData = new FormData()
    formData.append('avatar', file)

    await apiRequest(
      `${apiUrl()}/users/${id}/avatar`,
      'POST',
      formData as unknown as object
    )
  }

  async function deleteUserAvatar(id: number): Promise<void> {
    await apiRequest(`${apiUrl()}/users/${id}/avatar`, 'DELETE')
  }

  async function refreshAvatarPreview(id: number): Promise<string | null> {
    const user = await getAuthenticatedUser()
    const avatarPath = user?.avatar

    if (!avatarPath) return null

    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? ''
    return `${base}/api/users/${id}/avatar/show?v=${Date.now()}`
  }

  async function saveProfile(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
  ): Promise<void> {
    const fullName = `${firstName} ${lastName}`.trim()
    const data: NucUserObjectInterface = {
      id,
      name: fullName,
      email: email.trim(),
      phone_number: phoneNumber.trim() || undefined,
      role: sessionStorageGetItem('user_role') ?? 'user',
    }

    await editUser(data, getAndSetUser)
  }

  async function uploadAvatar(id: number, file: File): Promise<string | null> {
    await uploadUserAvatar(id, file)
    await getAndSetUser()

    return await refreshAvatarPreview(id)
  }

  async function removeAvatar(id: number): Promise<string | null> {
    await deleteUserAvatar(id)
    await getAndSetUser()

    return await refreshAvatarPreview(id)
  }

  async function savePreferences(
    id: number,
    data: { language?: string; country?: string }
  ): Promise<void> {
    await apiRequest(`${apiUrl()}/users/${id}/preferences`, 'PATCH', data)
    await getAndSetUser()
  }

  async function deleteAccount(id: number): Promise<void> {
    await deleteUser(id, async () => Promise.resolve())
  }

  async function changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ): Promise<void> {
    await apiRequest(`${apiUrl()}/users/${id}/password`, 'PUT', {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: newPasswordConfirmation,
    })
  }

  async function handleChangePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
    isChangingPassword: BooleanRef
  ): Promise<void> {
    try {
      isChangingPassword.value = true
      await changePassword(
        id,
        currentPassword,
        newPassword,
        newPasswordConfirmation
      )
      flashToast('Password updated successfully.', 'success')
    } catch {
      flashToast(
        'Failed to update password. Check your current password.',
        'error'
      )
    } finally {
      isChangingPassword.value = false
    }
  }

  async function handleUploadAvatar(
    id: number,
    file: File,
    isUploadingAvatar: BooleanRef,
    fileInputRef: FileInputRef,
    avatarPreview: NullableStringRef
  ): Promise<void> {
    try {
      isUploadingAvatar.value = true
      avatarPreview.value = await uploadAvatar(id, file)
      flashToast('Profile picture updated successfully.', 'success')
    } catch {
      flashToast('Avatar upload failed. Please try again.', 'error')
      avatarPreview.value = await refreshAvatarPreview(id)
    } finally {
      isUploadingAvatar.value = false
      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
    }
  }

  async function handleRemoveAvatar(
    id: number,
    isDeletingAvatar: BooleanRef,
    avatarPreview: NullableStringRef
  ): Promise<void> {
    try {
      isDeletingAvatar.value = true
      avatarPreview.value = await removeAvatar(id)
      flashToast('Profile picture removed.', 'success')
    } catch {
      flashToast('Failed to remove profile picture.', 'error')
    } finally {
      isDeletingAvatar.value = false
    }
  }

  async function handleSaveProfile(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    isSavingProfile: BooleanRef
  ): Promise<void> {
    if (!firstName.trim() || !email.trim()) {
      flashToast('First name and email are required.', 'error')
      return
    }

    try {
      isSavingProfile.value = true
      await saveProfile(id, firstName, lastName, email, phoneNumber)
      flashToast('Profile details saved.', 'success')
    } finally {
      isSavingProfile.value = false
    }
  }

  async function handleDeleteAccount(
    id: number,
    lang: string,
    isDeleteAccountDialogVisible: BooleanRef,
    isDeletingAccount: BooleanRef
  ): Promise<void> {
    try {
      isDeletingAccount.value = true
      await deleteAccount(id)
      removeUserFromSessionStorage()
      flashToast('Account deleted successfully.', 'success')
      isDeleteAccountDialogVisible.value = false

      if (typeof window !== 'undefined') {
        window.location.href = `/${lang}/login`
      }
    } catch {
      flashToast('Failed to delete account. Please try again.', 'error')
    } finally {
      isDeletingAccount.value = false
    }
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllUsers,
    getCountUsersByCreatedLastWeek,
    getUser,
    storeUser,
    editUser,
    deleteUser,
    getAuthenticatedUser,
    uploadUserAvatar,
    deleteUserAvatar,
    refreshAvatarPreview,
    saveProfile,
    uploadAvatar,
    removeAvatar,
    deleteAccount,
    savePreferences,
    changePassword,
    handleChangePassword,
    handleUploadAvatar,
    handleRemoveAvatar,
    handleSaveProfile,
    handleDeleteAccount,
  }
}
