import type { Ref } from 'vue'
import { ref } from 'vue'

import type {
  SelectItemInterface,
  ObjectType,
  OpenDialogFunctionType,
} from 'atomic'

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
  ['Show', 'pi pi-eye', 'show'],
  ['Edit', 'pi pi-pencil', 'edit'],
  ['Delete', 'pi pi-trash', 'delete'],
  ['Share', 'pi pi-share-alt', null],
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
        action ? () => openDialog(action, selectedObject.value) : undefined
      )
    )
  )

  return { selectItems }
}
