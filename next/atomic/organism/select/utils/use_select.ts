'use client'

import { useMemo } from 'react'

import type { OpenDialogFunctionType, SelectItemInterface } from '../types'

const selectData = [
  ['Show', 'pi pi-eye', 'show'],
  ['Edit', 'pi pi-pencil', 'edit'],
  ['Delete', 'pi pi-trash', 'delete'],
] as const

const createSelectItem = (
  label: string,
  icon: string,
  command?: () => void
): SelectItemInterface => ({
  label,
  icon,
  command,
})

export function useSelect(
  selectedObject: unknown,
  openDialog: OpenDialogFunctionType
) {
  if (typeof openDialog !== 'function') {
    throw new TypeError('openDialog is not a function')
  }

  const selectItems = useMemo(
    () =>
      selectData.map(([label, icon, action]) =>
        createSelectItem(
          label,
          icon,
          action ? () => openDialog(action, selectedObject) : undefined
        )
      ),
    [openDialog, selectedObject]
  )

  return { selectItems }
}
