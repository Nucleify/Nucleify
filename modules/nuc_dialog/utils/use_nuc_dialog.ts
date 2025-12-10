import type { Ref } from 'vue'
import { ref } from 'vue'

import type { NucDialogVisibleInterface, UseNucDialogInterface } from 'atomic'

export function useNucDialog(): UseNucDialogInterface {
  const selectedObject: Ref<ObjectType> = ref()
  const visible: NucDialogVisibleInterface = {
    create: ref(false),
    delete: ref(false),
    edit: ref(false),
    show: ref(false),
  }

  function openDialog(action: keyof typeof visible, object?: ObjectType): void {
    if (object) {
      setSelectedObject(object)
    }

    if (visible[action] !== undefined) {
      visible[action].value = true
    } else {
      console.error('Invalid action:', action)
    }
  }

  function closeDialog(action: keyof typeof visible): void {
    if (visible[action] !== undefined) {
      visible[action].value = false
    } else {
      console.error('Invalid action:', action)
    }
  }

  function setSelectedObject(object: ObjectType): void {
    selectedObject.value = object
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
