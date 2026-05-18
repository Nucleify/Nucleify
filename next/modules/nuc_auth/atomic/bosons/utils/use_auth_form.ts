'use client'

import { useState } from 'react'

import type {
  LoginFieldsInterface,
  RegisterFieldsInterface,
  UseAuthFormInterface,
} from 'nucleify'
import {
  apiRequest,
  getAndSetUser,
  getCurrentLang,
  loginFields,
  loginInputs,
  navigateToUrl,
  registerFields,
  registerInputs,
  syncColorsWithDatabase,
} from 'nucleify'

function isRegisterFields(
  data: LoginFieldsInterface | RegisterFieldsInterface
): data is RegisterFieldsInterface {
  return 'password_confirmation' in data
}

export function useAuthForm(): UseAuthFormInterface {
  const [currentLoginFields, setLoginFields] = useState<LoginFieldsInterface>({
    ...loginFields,
  })
  const [currentRegisterFields, setRegisterFields] =
    useState<RegisterFieldsInterface>({
      ...registerFields,
    })

  async function submitForm(
    data: LoginFieldsInterface | RegisterFieldsInterface
  ): Promise<void> {
    const url = isRegisterFields(data) ? '/register' : '/login'

    await apiRequest(url, 'POST', data)
    await getAndSetUser()
    await syncColorsWithDatabase()
  }

  async function submitAndGo(
    data: LoginFieldsInterface | RegisterFieldsInterface
  ): Promise<void> {
    const lang = getCurrentLang()

    await submitForm(data)
    navigateToUrl(`/${lang}/entities`)
  }

  return {
    loginFields: currentLoginFields,
    setLoginFields,
    loginInputs,
    registerFields: currentRegisterFields,
    setRegisterFields,
    registerInputs,
    submitForm,
    submitAndGo,
  }
}
