'use client'

import type { ChangeEvent, FormEvent, JSX } from 'react'

import type { RegisterFieldKey } from 'nucleify'
import { t, useAuthForm } from 'nucleify'

export function NucRegisterPage(): JSX.Element {
  const { submitAndGo, registerFields, setRegisterFields, registerInputs } =
    useAuthForm()

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    void submitAndGo(registerFields)
  }

  return (
    <form onSubmit={handleSubmit}>
      {registerInputs.map((field) => {
        const model = field.model as RegisterFieldKey

        return (
          <label key={field.id} htmlFor={field.id}>
            {t(field.label)}
            <input
              id={field.id}
              type={field.type}
              autoFocus={field.autofocus}
              value={registerFields[model]}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value
                setRegisterFields((prev) => ({
                  ...prev,
                  [model]: value,
                }))
              }}
            />
          </label>
        )
      })}

      <button type="submit">{t('auth-register-submit')}</button>
    </form>
  )
}
