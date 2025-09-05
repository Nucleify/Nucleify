export function isPhoneField(parameter: string): boolean {
  if (parameter == null) return false

  return parameter === 'work_phone' || parameter === 'personal_phone'
}
