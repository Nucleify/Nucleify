import { describe, expect, it } from 'vitest'

import { humanizeSupabaseError } from '../utils/humanize_supabase_error'

describe('humanizeSupabaseError', () => {
  it('maps not-null user_profiles id error', () => {
    expect(
      humanizeSupabaseError(
        'null value in column "id" of relation "user_profiles" violates not-null constraint'
      )
    ).toBe(
      'Unable to create user. A user account must exist before adding a profile.'
    )
  })

  it('maps duplicate email constraint', () => {
    expect(
      humanizeSupabaseError(
        'duplicate key value violates unique constraint "user_profiles_email_unique_idx"'
      )
    ).toBe('This value already exists.')
  })

  it('maps key already exists for email', () => {
    expect(
      humanizeSupabaseError('Key (email)=(test@example.com) already exists.')
    ).toBe('A user with this email already exists.')
  })

  it('maps auth invalid login', () => {
    expect(humanizeSupabaseError('Invalid login credentials')).toBe(
      'Incorrect email or password.'
    )
  })

  it('maps RLS errors', () => {
    expect(
      humanizeSupabaseError('new row violates row-level security policy')
    ).toBe('You do not have permission to perform this action.')
  })

  it('uses postgres code fallback', () => {
    expect(
      humanizeSupabaseError({
        code: '23503',
        message:
          'insert or update on table "x" violates foreign key constraint',
      })
    ).toBe('This operation references a record that does not exist.')
  })

  it('preserves already human messages', () => {
    expect(humanizeSupabaseError('Profile not found')).toBe('Profile not found')
  })
})
