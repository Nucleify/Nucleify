export function isSelectOrDatePicker(parameter: string): boolean {
  if (parameter == null) return false

  return parameter === 'select' || parameter === 'date-picker'
}
