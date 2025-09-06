export function isPhoneField(parameter: string): boolean {
  if (!parameter) return false

  return parameter === 'work_phone' || parameter === 'personal_phone'
}
