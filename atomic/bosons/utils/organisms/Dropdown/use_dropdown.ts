import { Ref, ref } from 'vue'

import {
    DropdownItemInterface,
    ObjectType,
    OpenDialogFunctionType,
} from 'atomic/bosons/types'

const createDropdownItem = (
    label: string,
    icon: string,
    command?: () => void
): DropdownItemInterface => ({
    label,
    icon,
    command: command ? command : undefined,
})

const dropdownData = [
    ['Show', 'pi pi-eye', 'show'],
    ['Edit', 'pi pi-pencil', 'edit'],
    ['Delete', 'pi pi-trash', 'delete'],
    ['Share', 'pi pi-share-alt', null],
] as const

export function useDropdown(
    selectedObject: Ref<ObjectType>,
    openDialog: OpenDialogFunctionType
) {
    if (typeof openDialog !== 'function') {
        throw new TypeError('openDialog is not a function')
    }

    const dropdownItems: Ref<DropdownItemInterface[]> = ref(
        dropdownData.map(([label, icon, action]) =>
            createDropdownItem(
                label,
                icon,
                action
                    ? () => openDialog(action, selectedObject.value)
                    : undefined
            )
        )
    )

    return { dropdownItems }
}
