'use client'

import React, { type ReactNode, useState } from 'react'

import {
  AdCheckbox,
  AdInputText,
  AdSelect,
  NucEmailUsDialogFrame,
  NucSubmitButton,
} from 'nucleify'

import i18next from 'i18next'

interface NucPricingEmailUsProps {
  visible: boolean
  onHide: () => void
  onSuccess?: () => void
  className?: string
  header?: ReactNode
}

export const NucPricingEmailUs: React.FC<NucPricingEmailUsProps> = ({
  visible,
  onHide,
  onSuccess,
  className,
  header,
}) => {
  const [email, setEmail] = useState('')
  const [websiteType, setWebsiteType] = useState(null)
  const [consent, setConsent] = useState(false)

  const websiteOptions = [
    { label: i18next.t('form-website-type-landing'), value: 'landing' },
    { label: i18next.t('form-website-type-business'), value: 'business' },
    { label: i18next.t('form-website-type-blog'), value: 'blog' },
    { label: i18next.t('form-website-type-help'), value: 'help' },
  ]

  const form = (
    <div id="email-us" className={className || ''}>
      <form
        className="email-us-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (onSuccess) onSuccess()
        }}
      >
        <div className="form-group">
          <label htmlFor="email">{i18next.t('form-email-label')}</label>
          <AdInputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={i18next.t('form-email-placeholder')}
            className="w-full"
            adType="main"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website_type">
            {i18next.t('form-website-type-label')}
          </label>
          <AdSelect
            id="website_type"
            value={websiteType}
            options={websiteOptions}
            onChange={(e) => setWebsiteType(e.value)}
            placeholder={i18next.t('form-website-type-placeholder')}
            className="w-full"
            adType="main"
          />
        </div>

        <div className="form-group checkbox-group">
          <AdCheckbox
            inputId="consent"
            checked={consent}
            onChange={(e) => setConsent(e.checked || false)}
            adType="main"
          />
          <label htmlFor="consent" className="cursor-pointer">
            {i18next.t('form-consent')}
          </label>
        </div>

        <NucSubmitButton
          type="submit"
          label={i18next.t('form-submit')}
          icon="mdi:send"
        />
      </form>

      <div className="email-us-footer">
        <span className="response-text">{i18next.t('form-response-text')}</span>
        <span className="response-badge">
          {i18next.t('form-response-badge')}
        </span>
      </div>
    </div>
  )

  return (
    <NucEmailUsDialogFrame
      visible={visible}
      onHide={onHide}
      dialogClassName="pricing-email-dialog"
    >
      {form}
    </NucEmailUsDialogFrame>
  )
}
