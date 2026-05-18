export interface ContactFormDataInterface {
  email: string
  website_type: string
  consent: boolean
}

export interface ContactFormErrorsInterface {
  email?: string
  website_type?: string
  consent?: string
}

export interface SubmitFormResultInterface {
  success: boolean
  errors?: ContactFormErrorsInterface
  message?: string
}

export interface FormFieldInterface {
  id: keyof Omit<ContactFormDataInterface, 'consent'>
  label: string
  component: string
  type?: string
  placeholder: string
  autocomplete?: string
  options?: { label: string; value: string }[]
}
