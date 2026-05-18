'use client'

import {
  type ChangeEvent,
  type FormEvent,
  type JSX,
  useMemo,
  useState,
} from 'react'

import {
  AdCard,
  AdCheckbox,
  AdInputText,
  AdLabel,
  AdSelect,
  type ContactFormDataInterface,
  type ContactFormErrorsInterface,
  type FormFieldInterface,
  getEmailUsTextFields,
  NucSubmitButton,
  submitContactForm,
  t,
} from 'nucleify'

import './index.scss'

type NucSectionEmailUsProps = {
  onSuccess?: () => void
  cardClassName?: string
}

const initialForm: ContactFormDataInterface = {
  email: '',
  website_type: '',
  consent: false,
}

export function NucSectionEmailUs({
  onSuccess,
  cardClassName = '',
}: NucSectionEmailUsProps = {}): JSX.Element {
  const fields = useMemo(() => getEmailUsTextFields(t), [])
  const [form, setForm] = useState<ContactFormDataInterface>(initialForm)
  const [errors, setErrors] = useState<ContactFormErrorsInterface>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const clearFieldError = (field: keyof ContactFormDataInterface): void => {
    if (!errors[field]) return
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleFieldChange =
    (field: keyof Omit<ContactFormDataInterface, 'consent'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const value = event.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
      clearFieldError(field)
    }

  const handleSelectChange =
    (field: keyof Omit<ContactFormDataInterface, 'consent'>) =>
    (event: { value: string }): void => {
      setForm((prev) => ({ ...prev, [field]: event.value || '' }))
      clearFieldError(field)
    }

  const handleConsentChange = (checked: boolean): void => {
    setForm((prev) => ({ ...prev, consent: checked }))
    clearFieldError('consent')
  }

  async function submitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsSubmitting(true)
    setResponseMessage('')

    const result = await submitContactForm(form)

    if (!result.success) {
      setErrors(result.errors || {})
      if (result.message) setResponseMessage(result.message)
      setIsSubmitting(false)
      return
    }

    setErrors({})
    setForm(initialForm)
    setResponseMessage(result.message || '')
    onSuccess?.()
    setIsSubmitting(false)
  }

  const renderField = (field: FormFieldInterface): JSX.Element => {
    const commonProps = {
      adType: 'main',
      id: field.id,
      placeholder: field.placeholder,
      invalid: !!errors[field.id],
    }

    if (field.component === 'select') {
      return (
        <AdSelect
          {...commonProps}
          className="p-dropdown"
          options={field.options || []}
          optionLabel="label"
          optionValue="value"
          showClear={false}
          value={form[field.id]}
          onChange={handleSelectChange(field.id)}
        />
      )
    }

    return (
      <AdInputText
        {...commonProps}
        className="p-inputtext"
        type={field.type}
        autoComplete={field.autocomplete}
        value={form[field.id]}
        onChange={handleFieldChange(field.id)}
      />
    )
  }

  const cardClassNames = ['p-card', cardClassName].filter(Boolean).join(' ')

  return (
    <AdCard className={cardClassNames} id="email-us">
      <form className="email-us-form" onSubmit={submitForm}>
        {fields.map((field) => (
          <div className="form-group" key={field.id}>
            <AdLabel forInput={field.id} label={field.label} />
            {renderField(field)}
            {errors[field.id] && (
              <small className="error-message">{errors[field.id]}</small>
            )}
          </div>
        ))}

        <div className="form-group checkbox-group">
          <AdCheckbox
            adType="main"
            className="p-checkbox"
            checked={form.consent}
            inputId="consent"
            invalid={!!errors.consent}
            onChange={(event) => handleConsentChange(Boolean(event.checked))}
          />
          <AdLabel forInput="consent" label={t('form-consent')} />
          {errors.consent && (
            <small className="error-message">{errors.consent}</small>
          )}
        </div>

        <NucSubmitButton
          className="submit-button"
          disabled={isSubmitting}
          label={isSubmitting ? t('form-sending') : t('form-submit')}
          type="submit"
          variant="primary"
        />
      </form>

      <div className="email-us-footer">
        <span className="response-text">{t('form-response-text')}</span>
        <span className="response-badge">{t('form-response-badge')}</span>
      </div>

      {responseMessage && (
        <small className="error-message">{responseMessage}</small>
      )}
    </AdCard>
  )
}
