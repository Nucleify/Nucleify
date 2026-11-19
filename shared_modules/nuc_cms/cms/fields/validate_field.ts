import type { FieldConfig } from './types'

export type FieldValidateResult = { ok: true } | { ok: false; error: string }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function validateFieldValue(
  field: FieldConfig,
  value: unknown
): FieldValidateResult {
  if (field.type === 'tabs' || field.type === 'row') {
    return { ok: true }
  }

  const required = 'required' in field && field.required
  const empty =
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)

  if (required && empty) {
    return { ok: false, error: `${field.label || field.name} is required` }
  }
  if (empty) return { ok: true }

  switch (field.type) {
    case 'text':
    case 'email':
    case 'textarea':
    case 'date':
      if (typeof value !== 'string') {
        return { ok: false, error: `${field.name} must be a string` }
      }
      if (field.type === 'email' && value && !value.includes('@')) {
        return { ok: false, error: `${field.name} must be an email` }
      }
      return { ok: true }
    case 'number':
      if (typeof value !== 'number' || Number.isNaN(value)) {
        return { ok: false, error: `${field.name} must be a number` }
      }
      return { ok: true }
    case 'checkbox':
      if (typeof value !== 'boolean') {
        return { ok: false, error: `${field.name} must be a boolean` }
      }
      return { ok: true }
    case 'select': {
      if (typeof value !== 'string') {
        return { ok: false, error: `${field.name} must be a string` }
      }
      const allowed = (field.options ?? []).map((o) => o.value)
      if (allowed.length && !allowed.includes(value)) {
        return { ok: false, error: `${field.name} has an invalid option` }
      }
      return { ok: true }
    }
    case 'json':
    case 'group':
      if (!isPlainObject(value)) {
        return { ok: false, error: `${field.name} must be an object` }
      }
      return { ok: true }
    case 'array':
    case 'blocks':
      if (!Array.isArray(value)) {
        return { ok: false, error: `${field.name} must be an array` }
      }
      return { ok: true }
    default:
      return { ok: true }
  }
}

export function validateFieldsData(
  fields: FieldConfig[],
  data: Record<string, unknown>
): FieldValidateResult {
  for (const field of fields) {
    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        const nested = validateFieldsData(tab.fields, data)
        if (!nested.ok) return nested
      }
      continue
    }
    if (field.type === 'row') {
      const nested = validateFieldsData(field.fields, data)
      if (!nested.ok) return nested
      continue
    }
    if (!('name' in field) || !field.name) continue
    const result = validateFieldValue(field, data[field.name])
    if (!result.ok) return result
  }
  return { ok: true }
}
