'use client'

import type { ChangeEvent, JSX } from 'react'
import { useEffect, useMemo, useState } from 'react'

import './_index.scss'

import {
  AdAvatar,
  AdButton,
  AdCard,
  AdDialog,
  AdIcon,
  AdPassword,
  AdSelect,
  NucProfileActions,
  passwordsMatch,
  sessionStorageGetItem,
  sessionStorageSetItem,
} from 'nucleify'

import { useTranslation } from 'react-i18next'

const MAX_AVATAR_SIZE_BYTES = 15 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
]

type PasswordFormType = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type ProfileFormType = {
  firstName: string
  lastName: string
  email: string
  phone_number: string
}

type SelectOptionType = {
  label: string
  value: string
}

export function NucUsersProfilePersonalInfo(): JSX.Element {
  const { t } = useTranslation()

  const [profileForm, setProfileForm] = useState<ProfileFormType>({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isPasswordDialogVisible, setIsPasswordDialogVisible] = useState(false)
  const [passwordForm, setPasswordForm] = useState<PasswordFormType>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [preferences, setPreferences] = useState({
    language: 'en',
    country: 'poland',
  })

  useEffect(() => {
    const userName = sessionStorageGetItem('user_name') ?? ''
    const parts = userName.split(' ').filter(Boolean)

    setProfileForm({
      firstName: parts[0] ?? '',
      lastName: parts.slice(1).join(' '),
      email: sessionStorageGetItem('user_email') || '',
      phone_number: sessionStorageGetItem('user_phone_number') || '',
    })

    setPreferences({
      language: sessionStorageGetItem('user_language') || 'en',
      country: sessionStorageGetItem('user_country') || 'poland',
    })
  }, [])

  const languageOptions: SelectOptionType[] = [
    { label: 'English', value: 'en' },
    { label: 'Polski', value: 'pl' },
    { label: 'Tieng Viet', value: 'vn' },
  ]
  const countries: SelectOptionType[] = [
    { label: 'Poland', value: 'poland' },
    { label: 'Germany', value: 'germany' },
    { label: 'United Kingdom', value: 'united-kingdom' },
  ]

  const fullName = useMemo(() => {
    const value = `${profileForm.firstName} ${profileForm.lastName}`.trim()
    return value.length > 0 ? value : t('profile-unknown-user')
  }, [profileForm.firstName, profileForm.lastName])

  const avatarLabel = useMemo(() => {
    const first = profileForm.firstName.trim().charAt(0)
    const last = profileForm.lastName.trim().charAt(0)
    return `${first}${last}`.trim().toUpperCase() || '?'
  }, [profileForm.firstName, profileForm.lastName])

  const isPasswordFormValid = useMemo(
    () =>
      passwordForm.currentPassword.length > 0 &&
      passwordForm.newPassword.length >= 8 &&
      passwordsMatch(passwordForm.newPassword, passwordForm.confirmPassword),
    [passwordForm]
  )

  const profileEditFields = [
    {
      name: 'firstName',
      key: 'firstName',
      label: 'profile-first-name',
      type: 'input-text',
    },
    {
      name: 'lastName',
      key: 'lastName',
      label: 'profile-last-name',
      type: 'input-text',
    },
    { name: 'email', key: 'email', label: 'profile-email', type: 'input-text' },
    {
      name: 'phone_number',
      key: 'phone_number',
      label: 'profile-phone-number',
      type: 'input-text',
    },
  ]

  function onProfileSaved(nextData: ProfileFormType): void {
    setProfileForm(nextData)
    sessionStorageSetItem('user_phone_number', nextData.phone_number || '')
  }

  function onAvatarSelected(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0]
    if (!file) return
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return
    if (file.size > MAX_AVATAR_SIZE_BYTES) return
    const nextPreview = URL.createObjectURL(file)
    setAvatarPreview(nextPreview)
  }

  function closePasswordDialog(): void {
    setIsPasswordDialogVisible(false)
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  return (
    <AdCard title={t('profile-account-details')}>
      <div className="profile-settings">
        <section className="profile-surface">
          <div className="profile-picture-row">
            <div className="profile-picture-left">
              <div className="profile-avatar-wrap">
                {avatarPreview ? (
                  <AdAvatar
                    image={avatarPreview}
                    size="xlarge"
                    shape="square"
                    className="profile-avatar-clickable"
                  />
                ) : (
                  <AdAvatar
                    label={avatarLabel}
                    size="xlarge"
                    shape="square"
                    className="profile-avatar-clickable"
                  />
                )}
                <div className="avatar-edit-corner">
                  <AdIcon icon="prime:pencil" />
                </div>
              </div>

              <div>
                <div className="profile-account-line">
                  <p className="profile-picture-title">{fullName}</p>
                  <span className="profile-status">{t('common-active')}</span>
                </div>
                <p className="profile-picture-subtitle">{profileForm.email}</p>
                <p className="profile-picture-subtitle">
                  {profileForm.phone_number || t('profile-no-phone')}
                </p>
              </div>
            </div>

            <NucProfileActions
              userId={1}
              currentLang={preferences.language}
              accountSinceLabel={
                sessionStorageGetItem('user_created_at') || t('common-unknown')
              }
              editProfileData={profileForm}
              profileEditFields={profileEditFields}
              onProfileSaved={onProfileSaved}
            />
          </div>

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            className="hidden-file-input"
            onChange={onAvatarSelected}
          />
        </section>

        <h4 className="profile-section-title">
          {t('profile-account-preference')}
        </h4>

        <section className="profile-surface">
          <div className="preference-row">
            <div className="preference-left">
              <span className="integration-icon">
                <AdIcon icon="prime:language" />
              </span>
              <div>
                <p className="integration-title">{t('profile-language')}</p>
                <p className="integration-subtitle">
                  {t('profile-language-desc')}
                </p>
              </div>
            </div>
            <AdSelect
              value={preferences.language}
              options={languageOptions}
              optionLabel="label"
              optionValue="value"
              adType="main"
              className="profile-select"
              onChange={(event: { value: string }) =>
                setPreferences((prev) => {
                  sessionStorageSetItem('user_language', event.value)
                  return { ...prev, language: event.value }
                })
              }
            />
          </div>

          <hr className="settings-card-divider" />

          <div className="preference-row">
            <div className="preference-left">
              <span className="integration-icon">
                <AdIcon icon="prime:globe" />
              </span>
              <div>
                <p className="integration-title">{t('profile-country')}</p>
                <p className="integration-subtitle">
                  {t('profile-country-desc')}
                </p>
              </div>
            </div>
            <AdSelect
              value={preferences.country}
              options={countries}
              optionLabel="label"
              optionValue="value"
              adType="main"
              className="profile-select"
              onChange={(event: { value: string }) =>
                setPreferences((prev) => {
                  sessionStorageSetItem('user_country', event.value)
                  return { ...prev, country: event.value }
                })
              }
            />
          </div>
        </section>

        <h4 className="profile-section-title">{t('profile-security')}</h4>

        <section className="profile-surface">
          <div className="preference-row">
            <div className="preference-left">
              <span className="integration-icon">
                <AdIcon icon="prime:lock" />
              </span>
              <div>
                <p className="integration-title">{t('profile-password')}</p>
                <p className="integration-subtitle">
                  {t('profile-password-desc')}
                </p>
              </div>
            </div>
            <AdButton
              label={t('profile-change-password')}
              adType="main"
              outlined
              size="small"
              onClick={() => setIsPasswordDialogVisible(true)}
            />
          </div>

          <hr className="settings-card-divider" />

          <div className="preference-row">
            <div className="preference-left">
              <span className="integration-icon">
                <AdIcon icon="prime:shield" />
              </span>
              <div>
                <p className="integration-title">{t('profile-2fa')}</p>
                <p className="integration-subtitle">{t('profile-2fa-desc')}</p>
              </div>
            </div>
            <span className="coming-soon-badge">{t('common-coming-soon')}</span>
          </div>
        </section>
      </div>

      <AdDialog
        visible={isPasswordDialogVisible}
        onHide={closePasswordDialog}
        modal
        dismissableMask
        draggable={false}
        showHeader
        header={t('profile-change-password')}
        footer={
          <div className="dialog-buttons-container">
            <AdButton
              label={t('common-cancel')}
              severity="secondary"
              onClick={closePasswordDialog}
            />
            <AdButton
              label={t('profile-update-password')}
              adType="main"
              disabled={!isPasswordFormValid}
              onClick={closePasswordDialog}
            />
          </div>
        }
      >
        <div className="password-dialog-fields">
          <div className="password-dialog-field">
            <label htmlFor="nuc-pwd-cur">{t('profile-current-password')}</label>
            <AdPassword
              id="nuc-pwd-cur"
              value={passwordForm.currentPassword}
              feedback={false}
              toggleMask
              autoComplete="one-time-code"
              onChange={(event: { target?: { value?: string } }) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  currentPassword: event.target?.value ?? '',
                }))
              }
            />
          </div>
          <div className="password-dialog-field">
            <label htmlFor="nuc-pwd-new">{t('profile-new-password')}</label>
            <AdPassword
              id="nuc-pwd-new"
              value={passwordForm.newPassword}
              toggleMask
              autoComplete="one-time-code"
              onChange={(event: { target?: { value?: string } }) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  newPassword: event.target?.value ?? '',
                }))
              }
            />
          </div>
          <div className="password-dialog-field">
            <label htmlFor="nuc-pwd-confirm">
              {t('profile-confirm-password')}
            </label>
            <AdPassword
              id="nuc-pwd-confirm"
              value={passwordForm.confirmPassword}
              toggleMask
              autoComplete="one-time-code"
              passwordsMatch={passwordsMatch(
                passwordForm.newPassword,
                passwordForm.confirmPassword
              )}
              onChange={(event: { target?: { value?: string } }) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  confirmPassword: event.target?.value ?? '',
                }))
              }
            />
          </div>
        </div>
      </AdDialog>
    </AdCard>
  )
}
