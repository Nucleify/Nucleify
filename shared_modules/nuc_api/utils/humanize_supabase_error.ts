export type SupabaseErrorLike = {
  message: string
  code?: string
  details?: string | null
  hint?: string | null
}

const AUTH_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Incorrect email or password.',
  'Email not confirmed': 'Please confirm your email before signing in.',
  'User already registered': 'An account with this email already exists.',
  'Password should be at least 6 characters':
    'Password must be at least 6 characters long.',
  'Signup requires a valid password': 'Please enter a valid password.',
  'Unable to validate email address: invalid format':
    'Please enter a valid email address.',
  'Email rate limit exceeded': 'Too many attempts. Please try again later.',
  'For security purposes, you can only request this after':
    'Too many attempts. Please wait a moment and try again.',
}

const CODE_MESSAGES: Record<string, string> = {
  '23502': 'A required field is missing.',
  '23505': 'This value already exists.',
  '23503': 'This operation references a record that does not exist.',
  '23514': 'The provided value is invalid.',
  '42501': 'You do not have permission to perform this action.',
  '22P02': 'Invalid value format.',
  PGRST116: 'Record not found.',
  PGRST301: 'Request timed out. Please try again.',
}

const COLUMN_LABELS: Record<string, string> = {
  id: 'User ID',
  email: 'Email',
  name: 'Name',
  password: 'Password',
  role: 'Role',
  avatar: 'Avatar',
  language: 'Language',
  country: 'Country',
}

const TABLE_LABELS: Record<string, string> = {
  user_profiles: 'user profile',
  friendships: 'friendship',
  articles: 'article',
  contacts: 'contact',
  files: 'file',
  modules: 'module',
  pages: 'page',
  translations: 'translation',
}

function labelColumn(column: string): string {
  return COLUMN_LABELS[column] ?? column.replace(/_/g, ' ')
}

function labelTable(table: string): string {
  return TABLE_LABELS[table] ?? table.replace(/_/g, ' ')
}

function matchMessage(message: string): string | null {
  const patterns: Array<{
    regex: RegExp
    format: (...args: string[]) => string
  }> = [
    {
      regex:
        /null value in column "([^"]+)" of relation "([^"]+)" violates not-null constraint/i,
      format: (column, table) => {
        if (table === 'user_profiles' && column === 'id') {
          return 'Unable to create user. A user account must exist before adding a profile.'
        }
        return `${labelColumn(column)} is required.`
      },
    },
    {
      regex: /Key \(([^)]+)\)=\([^)]+\) already exists/i,
      format: (column) => {
        if (column === 'email') {
          return 'A user with this email already exists.'
        }
        return `${labelColumn(column)} is already in use.`
      },
    },
    {
      regex: /duplicate key value violates unique constraint/i,
      format: () => 'This value already exists.',
    },
    {
      regex: /violates foreign key constraint/i,
      format: () => 'This operation references a record that does not exist.',
    },
    {
      regex: /violates check constraint/i,
      format: () => 'The provided value is invalid.',
    },
    {
      regex: /violates row-level security policy/i,
      format: () => 'You do not have permission to perform this action.',
    },
    {
      regex: /permission denied for (?:table|relation) "([^"]+)"/i,
      format: (table) =>
        `You do not have permission to access ${labelTable(table)}.`,
    },
    {
      regex: /invalid input syntax for type ([^:]+)/i,
      format: (type) => `Invalid ${type.trim()} value.`,
    },
    {
      regex: /relation "([^"]+)" does not exist/i,
      format: (table) => `${labelTable(table)} is not available.`,
    },
    {
      regex: /JWT expired/i,
      format: () => 'Your session has expired. Please sign in again.',
    },
    {
      regex: /The resource already exists/i,
      format: () => 'This file already exists.',
    },
    {
      regex: /Bucket not found/i,
      format: () => 'File storage is not available.',
    },
    {
      regex: /Payload too large/i,
      format: () => 'The file is too large.',
    },
    {
      regex: /new row violates row-level security/i,
      format: () => 'You do not have permission to perform this action.',
    },
  ]

  for (const { regex, format } of patterns) {
    const match = message.match(regex)
    if (match) return format(...match.slice(1))
  }

  return null
}

function matchAuthMessage(message: string): string | null {
  if (AUTH_MESSAGES[message]) return AUTH_MESSAGES[message]

  for (const [key, value] of Object.entries(AUTH_MESSAGES)) {
    if (message.startsWith(key)) return value
  }

  return null
}

export function humanizeSupabaseError(
  error: SupabaseErrorLike | string
): string {
  const payload =
    typeof error === 'string'
      ? { message: error }
      : { ...error, message: error.message?.trim() ?? '' }

  if (!payload.message) return 'Something went wrong. Please try again.'

  const authMessage = matchAuthMessage(payload.message)
  if (authMessage) return authMessage

  if (payload.code && CODE_MESSAGES[payload.code]) {
    const patternMessage = matchMessage(payload.message)
    if (patternMessage) return patternMessage
    return CODE_MESSAGES[payload.code]
  }

  const patternMessage = matchMessage(payload.message)
  if (patternMessage) return patternMessage

  if (/^[A-Z0-9_]+:/.test(payload.message)) {
    return 'Something went wrong. Please try again.'
  }

  if (
    payload.message.includes('violates') ||
    payload.message.includes('constraint') ||
    payload.message.includes('relation "')
  ) {
    return 'Something went wrong. Please try again.'
  }

  return payload.message
}
