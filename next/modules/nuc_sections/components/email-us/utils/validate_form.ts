import type {
  ContactFormDataInterface,
  ContactFormErrorsInterface,
} from 'nucleify'

export function validateContactForm(
  form: ContactFormDataInterface
): ContactFormErrorsInterface {
  const errors: ContactFormErrorsInterface = {}
  const validWebsiteTypes = ['landing', 'business', 'blog', 'help']

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
  } else if (form.email.length > 255) {
    errors.email = 'Email must be less than 255 characters'
  }

  if (!form.website_type) {
    errors.website_type = 'Please select a website type'
  } else if (!validWebsiteTypes.includes(form.website_type)) {
    errors.website_type = 'Please select a valid website type'
  }

  if (!form.consent) {
    errors.consent = 'You must accept the data processing'
  }

  return errors
}
