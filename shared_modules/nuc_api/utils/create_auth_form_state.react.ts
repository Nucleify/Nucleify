'use client'

import type { AppFramework } from './app_framework'
import { assertAppFramework } from './app_framework'

import { useState } from 'react'
import type { AuthFormState } from '../types/auth/interfaces.react'

export function createAuthFormState<
  TLogin extends object,
  TRegister extends object,
>(
  framework: AppFramework,
  initialLogin: TLogin,
  initialRegister: TRegister
): AuthFormState<TLogin, TRegister> {
  assertAppFramework(framework, 'next')

  const [loginFields, setLoginFields] = useState(initialLogin)
  const [registerFields, setRegisterFields] = useState(initialRegister)

  return {
    loginFields,
    setLoginFields,
    registerFields,
    setRegisterFields,
  }
}
