'use client'

import type { JSX } from 'react'
import { useEffect, useState } from 'react'

import './_index.scss'

import type { UseToastInterface } from 'nucleify'
import { AdButton, AdDialog, useAtomicToast } from 'nucleify'

import { useTranslation } from 'react-i18next'

type ProfileEditDataType = {
  firstName: string
  lastName: string
  email: string
  phone_number: string
}

type ProfileEditFieldType = {
  name: string
  key: string
  label: string
  type: string
}

type NucProfileActionsProps = {
  userId: number
  currentLang: string
  accountSinceLabel: string
  editProfileData: ProfileEditDataType
  profileEditFields: ProfileEditFieldType[]
  onProfileSaved?: (value: ProfileEditDataType) => void
}

export function NucProfileActions({
  userId,
  currentLang,
  accountSinceLabel,
  editProfileData,
  profileEditFields,
  onProfileSaved,
}: NucProfileActionsProps): JSX.Element {
  const { t } = useTranslation()
  const { flashToast }: UseToastInterface = useAtomicToast()

  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [isEditProfileDialogVisible, setIsEditProfileDialogVisible] =
    useState(false)
  const [isDeleteAccountDialogVisible, setIsDeleteAccountDialogVisible] =
    useState(false)
  const [editDialogData, setEditDialogData] =
    useState<ProfileEditDataType>(editProfileData)

  useEffect(() => {
    if (isEditProfileDialogVisible) {
      setEditDialogData(editProfileData)
    }
  }, [editProfileData, isEditProfileDialogVisible])

  async function confirmEditProfile(data?: unknown): Promise<void> {
    const source =
      typeof data === 'object' && data !== null
        ? (data as Record<string, unknown>)
        : (editDialogData as Record<string, unknown>)

    const nextData: ProfileEditDataType = {
      firstName: String(source.firstName ?? ''),
      lastName: String(source.lastName ?? ''),
      email: String(source.email ?? ''),
      phone_number: String(source.phone_number ?? ''),
    }

    if (!nextData.firstName.trim() || !nextData.email.trim()) {
      flashToast(t('toast-name-email-required'), 'error')
      return
    }

    setIsSavingProfile(true)
    onProfileSaved?.(nextData)
    setIsSavingProfile(false)
    setIsEditProfileDialogVisible(false)
  }

  async function confirmDeleteAccount(): Promise<void> {
    setIsDeletingAccount(true)
    console.info(
      `[nuc_users] delete account requested for user ${userId} lang ${currentLang}`
    )
    setIsDeletingAccount(false)
    setIsDeleteAccountDialogVisible(false)
  }

  return (
    <div className="profile-actions-wrap">
      <p className="profile-actions-meta">
        {t('profile-account-since')} <strong>{accountSinceLabel}</strong>
      </p>

      <div className="profile-actions">
        <AdButton
          label={t('profile-edit-account')}
          adType="main"
          outlined
          size="small"
          disabled={isSavingProfile}
          onClick={() => setIsEditProfileDialogVisible(true)}
        />
        <AdButton
          label={t('profile-delete-account')}
          outlined
          size="small"
          severity="danger"
          disabled={isDeletingAccount}
          onClick={() => setIsDeleteAccountDialogVisible(true)}
        />
      </div>

      <AdDialog
        visible={isEditProfileDialogVisible}
        onHide={() => setIsEditProfileDialogVisible(false)}
        modal
        dismissableMask
        draggable={false}
        showHeader
        header={t('profile-edit-profile')}
        footer={
          <div className="dialog-buttons-container">
            <AdButton
              label={t('common-cancel')}
              severity="secondary"
              onClick={() => setIsEditProfileDialogVisible(false)}
            />
            <AdButton
              label={t('common-save')}
              adType="main"
              disabled={isSavingProfile}
              onClick={() => void confirmEditProfile(editDialogData)}
            />
          </div>
        }
      >
        <div className="form-container">
          {profileEditFields.map((field) => (
            <div key={field.name} className="form-div">
              <label htmlFor={field.name}>{t(field.label)}</label>
              <input
                id={field.name}
                value={String(
                  editDialogData[field.key as keyof ProfileEditDataType] ?? ''
                )}
                onChange={(event) =>
                  setEditDialogData((prev) => ({
                    ...prev,
                    [field.key]: event.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </AdDialog>

      <AdDialog
        visible={isDeleteAccountDialogVisible}
        onHide={() => setIsDeleteAccountDialogVisible(false)}
        modal
        dismissableMask
        draggable={false}
        showHeader
        header={t('profile-delete-account')}
        footer={
          <div className="dialog-buttons-container">
            <AdButton
              label={t('common-cancel')}
              severity="secondary"
              onClick={() => setIsDeleteAccountDialogVisible(false)}
            />
            <AdButton
              label={t('common-delete')}
              severity="danger"
              disabled={isDeletingAccount}
              onClick={() => void confirmDeleteAccount()}
            />
          </div>
        }
      >
        <p>{t('profile-delete-confirm')}</p>
      </AdDialog>
    </div>
  )
}
