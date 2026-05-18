import { useState } from 'react'

import type { NucDialogVisibleInterface, UseNucDialogInterface } from '../types'

export function useNucDialog(): UseNucDialogInterface {
  const [selectedObject, setSelectedObject] = useState<ObjectType>()
  const [visible, setVisible] = useState<NucDialogVisibleInterface>({
    create: false,
    delete: false,
    edit: false,
    show: false,
  })

  function openDialog(action: keyof typeof visible, object?: ObjectType): void {
    if (object) {
      setSelectedObject(object)
    }

    if (visible[action] !== undefined) {
      setVisible((prev) => ({ ...prev, [action]: true }))
    } else {
      console.error('Invalid action:', action)
    }
  }

  function closeDialog(action: keyof typeof visible): void {
    if (visible[action] !== undefined) {
      setVisible((prev) => ({ ...prev, [action]: false }))
    } else {
      console.error('Invalid action:', action)
    }
  }

  return {
    visibleShow: visible.show,
    visibleCreate: visible.create,
    visibleEdit: visible.edit,
    visibleDelete: visible.delete,
    selectedObject,
    openDialog,
    closeDialog,
  }
}
