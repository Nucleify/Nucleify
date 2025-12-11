export function isSelectOrDatePicker(parameter: string): boolean {
  if (!parameter) return false

  return parameter === 'select' || parameter === 'date-picker'
}
