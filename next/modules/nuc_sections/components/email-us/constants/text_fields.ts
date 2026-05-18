import type { FormFieldInterface } from '../types'

export function getEmailUsTextFields(
  t: (key: string) => string
): FormFieldInterface[] {
  return [
    {
      id: 'email',
      label: t('form-email-label'),
      component: 'input-text',
      type: 'email',
      placeholder: t('form-email-placeholder'),
      autocomplete: 'email',
    },
    {
      id: 'website_type',
      label: t('form-website-type-label'),
      component: 'select',
      placeholder: t('form-website-type-placeholder'),
      options: [
        { label: t('form-website-type-landing'), value: 'landing' },
        { label: t('form-website-type-business'), value: 'business' },
        { label: t('form-website-type-blog'), value: 'blog' },
        { label: t('form-website-type-help'), value: 'help' },
      ],
    },
  ]
}
