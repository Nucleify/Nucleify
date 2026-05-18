import { Button } from 'primereact/button'
import type { DialogProps } from 'primereact/dialog'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useMemo, useState } from 'react'

import type { ComponentType, FormDataInterface } from 'nucleify'
import {
  getComponent,
  getTitle,
  isEmpty,
  isPhoneField,
  isSelectOrDatePicker,
  passwordsMatch,
} from 'nucleify'

import { useTranslation } from 'react-i18next'
import { AdHeading } from '../../../../../../atomic/atom/heading'

interface DialogField {
  name: string
  label: string
  key?: string
  type: string
  props?: Record<string, unknown>
}

type FieldChangeEvent =
  | {
      target?: {
        value?: unknown
      }
      value?: unknown
    }
  | undefined
  | null

interface NucDialogProps
  extends Omit<DialogProps, 'onHide' | 'header' | 'footer'> {
  entity?: ObjectNameType
  action?: ActionType
  title?: string
  fields?: DialogField[]
  selectedObject?: ObjectType
  data?: ObjectType | FormDataInterface
  getData?: unknown
  confirmButtonLabel?: string
  confirmButtonDisabled?: boolean
  children?: React.ReactNode
  confirm?: (data: FormDataInterface | number, getData?: unknown) => void
  cancelButtonLabel?: string
  close?: (action: ActionType) => void
  onUpdateVisible?: (visible: boolean) => void
}
export const NucDialog: React.FC<NucDialogProps> = (props) => {
  const { t } = useTranslation()

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
    modal = true,
    showHeader = true,
    children,
    ...restProps
  } = props

  const [formData, setFormData] = useState<FormDataInterface>(() => {
    return {
      ...(data && !Array.isArray(data) ? data : {}),
    } as unknown as FormDataInterface
  })

  useEffect(() => {
    const newData = action === 'edit' ? selectedObject : data
    setFormData({ ...(newData || {}) } as unknown as FormDataInterface)
  }, [action, selectedObject, data])

  const handleFieldChange = (name: string, e: FieldChangeEvent) => {
    const val = e && e.target !== undefined ? e.target.value : e?.value
    setFormData((prev) => ({ ...prev, [name]: val }) as FormDataInterface)
  }

  const translatedProps = (fieldProps?: Record<string, unknown>) => {
    if (!fieldProps) return undefined
    const result = { ...fieldProps }
    if (typeof result.placeholder === 'string') {
      result.placeholder = t(result.placeholder)
    }
    return result
  }

  const headerTemplate = showHeader ? (
    action === 'show' && selectedObject ? (
      <AdHeading tag={2} text={getTitle(selectedObject)} />
    ) : (
      <AdHeading tag={2} text={title} />
    )
  ) : null

  const footerTemplate = (
    <div className="dialog-buttons-container">
      <Button
        label={cancelButtonLabel}
        icon="pi pi-times"
        severity="secondary"
        onClick={() => close?.(action!)}
      />

      {action !== 'delete' && confirm && (
        <Button
          className={`ad-button-${entity}`}
          label={confirmButtonLabel}
          disabled={confirmButtonDisabled}
          icon="pi pi-check"
          onClick={() => confirm(formData, getData)}
        />
      )}

      {action === 'delete' && confirm && selectedObject && (
        <Button
          className={`ad-button-${entity}`}
          label={confirmButtonLabel}
          icon="pi pi-check"
          onClick={() => confirm(selectedObject.id!, getData)}
        />
      )}
    </div>
  )

  return (
    <Dialog
      header={headerTemplate}
      footer={footerTemplate}
      modal={modal}
      showHeader={showHeader}
      className={`nuc-dialog ${action}`}
      style={(style as React.CSSProperties) ?? undefined}
      onHide={() => close?.(action as ActionType)}
      {...restProps}
    >
      {children}

      {fields && action !== 'show' && (
        <form
          className="form-container"
          action="#"
          onSubmit={(e) => e.preventDefault()}
        >
          {fields.map((field: DialogField, index: number) => {
            const FieldComponent = getComponent(
              field.type as ComponentType
            ) as React.ElementType

            return (
              <div key={index} className="form-div">
                <label htmlFor={field.name}>{t(field.label)}</label>

                <FieldComponent
                  {...translatedProps(field.props)}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={(e: FieldChangeEvent) =>
                    handleFieldChange(field.name, e)
                  }
                  adType={entity}
                  panelClass={
                    isSelectOrDatePicker(field.type) ? entity : undefined
                  }
                  dateFormat={
                    field.type === 'date-picker' ? 'yy-mm-dd' : undefined
                  }
                  toggleMask={field.type === 'password' ? true : undefined}
                  passwordsMatch={
                    field.name === 'password_confirmation' &&
                    passwordsMatch(
                      formData.password,
                      formData.password_confirmation
                    )
                      ? true
                      : undefined
                  }
                  emptyPassword={
                    field.name === 'password_confirmation' &&
                    isEmpty(formData.password)
                      ? true
                      : undefined
                  }
                  emptyConfirmPassword={
                    field.name === 'password_confirmation' &&
                    isEmpty(formData.password_confirmation)
                      ? true
                      : undefined
                  }
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
          {fields.map((item: DialogField, key: number) => (
            <div key={key}>
              <div className="share-dialog-subtitle">
                <AdHeading tag={5} text="Select Users" />
              </div>
              <div>
                {
                  (selectedObject as Record<string, unknown>)[
                    item.key ?? item.name
                  ] as React.ReactNode
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </Dialog>
  )
}
