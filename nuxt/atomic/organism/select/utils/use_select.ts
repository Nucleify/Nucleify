import type { Ref } from 'vue'
import { ref } from 'vue'

import type { OpenDialogFunctionType } from 'nucleify'

import type { SelectItemInterface } from '../types/Item/interfaces'

const createSelectItem = (
  label: string,
  icon: string,
  command?: () => void
): SelectItemInterface => ({
  label,
  icon,
  command: command ? command : undefined,
})

const selectData = [
  ['Show', 'prime:eye', 'show'],
  ['Edit', 'prime:pencil', 'edit'],
  ['Delete', 'prime:trash', 'delete'],
] as const

export function useSelect(
  selectedObject: Ref<ObjectType>,
  openDialog: OpenDialogFunctionType
) {
  if (typeof openDialog !== 'function') {
    throw new TypeError('openDialog is not a function')
  }

  const selectItems: Ref<SelectItemInterface[]> = ref(
    selectData.map(([label, icon, action]) =>
      createSelectItem(
        label,
        icon,
        action
          ? () => openDialog(action, selectedObject.value as ObjectType)
          : undefined
      )
    )
  )

  return { selectItems }
}
