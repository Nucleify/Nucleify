'use client'

import React, { useEffect, useState } from 'react'

import type { ComponentType, FormDataInterface } from 'nucleify'
import {
  AdButton,
  AdDialog,
  AdHeading,
  getComponent,
  getTitle,
  isEmpty,
  isPhoneField,
  isSelectOrDatePicker,
  passwordsMatch,
} from 'nucleify'

import { NucDialogInterface } from './types'

type AdTypeType =
  | 'article'
  | 'main'
  | 'activity'
  | 'contact'
  | 'file'
  | 'money'
  | 'question'
  | 'technology'
  | 'user'
  | undefined

export function NucDialog(props: NucDialogInterface) {
  const t = (str: string) => str

  function translatedProps(fieldProps?: Record<string, unknown>) {
    if (!fieldProps) return undefined
    const result = { ...fieldProps }
    if (typeof result.placeholder === 'string') {
      result.placeholder = t(result.placeholder)
    }
    return result
  }

  const {
    entity,
    action,
    title,
    fields,
    selectedObject,
    data,
    getData,
    confirmButtonLabel,
    confirmButtonDisabled,
    confirm,
    cancelButtonLabel,
    close,
    style,
    ...rest
  } = props

  const [formData, setFormData] = useState<FormDataInterface>({
    ...(props.data && (Array.isArray(props.data) ? {} : props.data)),
  } as FormDataInterface)

  useEffect(() => {
    const newData = action === 'edit' ? selectedObject : data
    setFormData({ ...newData } as FormDataInterface)
  }, [action, selectedObject, data])

  return (
    <AdDialog
      {...rest}
      modal={props.modal ?? true}
      showHeader={props.showHeader ?? true}
      onHide={() => {
        if (action) close?.(action)
      }}
      className={`nuc-dialog ${action || ''}`}
      header={
        action === 'show' && selectedObject ? (
          <AdHeading tag={2} text={getTitle(selectedObject)} />
        ) : (
          <AdHeading tag={2} text={title} />
        )
      }
      footer={
        <div className="dialog-buttons-container">
          <AdButton
            label={cancelButtonLabel}
            icon="prime:times"
            severity="secondary"
            onClick={() => close?.(action!)}
          />
          {action !== 'delete' && confirm && (
            <AdButton
              adType={entity as AdTypeType}
              label={confirmButtonLabel}
              disabled={confirmButtonDisabled}
              icon="prime:check"
              onClick={() => confirm(formData as unknown as number, getData)}
            />
          )}
          {action === 'delete' && confirm && selectedObject && (
            <AdButton
              adType={entity as AdTypeType}
              label={confirmButtonLabel}
              icon="prime:check"
              onClick={() => confirm(selectedObject.id, getData)}
            />
          )}
        </div>
      }
      style={(style as React.CSSProperties) || undefined}
    >
      {props.children}

      {fields && action !== 'show' && (
        <form className="form-container" action="#">
          {fields.map((field, index) => {
            const FieldComponent = getComponent(
              field.type as ComponentType
            ) as React.ElementType
            const isSelectLike = isSelectOrDatePicker(field.type)
            const isPasswordConfirmation =
              field.name === 'password_confirmation'
            return (
              <div key={index} className="form-div">
                <label htmlFor={field.name}>{t(field.label)}</label>
                <FieldComponent
                  {...translatedProps(field.props)}
                  id={field.name}
                  value={formData[field.name] ?? ''}
                  onChange={(e: {
                    target?: { value: unknown }
                    value?: unknown
                  }) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: (e.target
                        ? e.target.value
                        : e.value || e) as string,
                    }))
                  }
                  adType={entity as AdTypeType}
                  {...(isSelectLike ? { panelClass: entity } : {})}
                  {...(field.type === 'date-picker'
                    ? { dateFormat: 'yy-mm-dd' }
                    : {})}
                  {...(field.type === 'password' ? { toggleMask: true } : {})}
                  {...(isPasswordConfirmation &&
                  passwordsMatch(
                    formData.password,
                    formData.password_confirmation
                  )
                    ? { passwordsMatch: true }
                    : {})}
                  {...(isPasswordConfirmation && isEmpty(formData.password)
                    ? { emptyPassword: true }
                    : {})}
                  {...(isPasswordConfirmation &&
                  isEmpty(formData.password_confirmation)
                    ? { emptyConfirmPassword: true }
                    : {})}
                  mask={isPhoneField(field.name) ? '999-999-999' : undefined}
                  placeholder={isPhoneField(field.name) ? '999-999-999' : ''}
                  unmask={isPhoneField(field.name) ? true : undefined}
                />
              </div>
            )
          })}
        </form>
      )}

      {fields && action === 'show' && selectedObject && (
        <div className="show-data-container">
          {fields.map((item, key) => (
            <div key={key}>
              <AdHeading tag={5} text={t(item.label)} />
              <div>
                {
                  (selectedObject as unknown as Record<string, unknown>)[
                    item.key
                  ] as React.ReactNode
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </AdDialog>
  )
}
