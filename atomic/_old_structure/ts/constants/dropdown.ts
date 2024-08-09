import { Ref, ref } from 'vue'

import { DropdownItemInterface, ObjectType } from '@/types'

import { OpenDialogFunctionType } from 'atomic/bosons/types'

export default function handleDropdownItems(
    selectedObject: Ref<ObjectType>,
    openDialog: OpenDialogFunctionType
) {
    const dropdownItems: Ref<DropdownItemInterface[]> = ref([
        {
            label: 'Show',
            icon: 'pi pi-eye',
            command: (): void => {
                openDialog('show', selectedObject.value)
            },
        },
        {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: (): void => {
                openDialog('edit', selectedObject.value)
            },
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: (): void => {
                openDialog('delete', selectedObject.value)
            },
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
        },
    ])

    return { dropdownItems }
}
