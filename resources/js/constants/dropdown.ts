import { Ref, ref } from 'vue'

import { DropdownItemInterface, ObjectType } from '@/types'

export default function handleDropdownItems(
    selectedObject: Ref<ObjectType>,
    openModal: (action: string, selectedObject: ObjectType) => void
) {
    const dropdownItems: Ref<DropdownItemInterface[]> = ref([
        {
            label: 'Show',
            icon: 'pi pi-eye',
            command: (): void => {
                openModal('show', selectedObject.value)
            },
        },
        {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: (): void => {
                openModal('edit', selectedObject.value)
            },
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: (): void => {
                openModal('delete', selectedObject.value)
            },
        },
        {
            label: 'Share',
            icon: 'pi pi-share-alt',
        },
    ])

    return { dropdownItems }
}
