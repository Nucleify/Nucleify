import { ref, Ref } from 'vue'
import Menu from 'primevue/menu'

import { ObjectType } from '@/types'

export default function useMenuAndModal() {
    const visibleShow: Ref<boolean> = ref(false)
    const visibleCreate: Ref<boolean> = ref(false)
    const visibleEdit: Ref<boolean> = ref(false)
    const visibleDelete: Ref<boolean> = ref(false)
    const selectedObject: Ref<ObjectType> = ref<ObjectType>()

    function openModal(action: string, object?: ObjectType): void {
        if (object) {
            setSelectedObject(object)
        }

        switch (action) {
            case 'show':
                visibleShow.value = true
                break
            case 'create':
                visibleCreate.value = true
                break
            case 'edit':
                visibleEdit.value = true
                break
            case 'delete':
                visibleDelete.value = true
                break
            default:
                console.error('Invalid action:', action)
                break
        }
    }

    function closeModal(action: string): void {
        switch (action) {
            case 'show':
                visibleShow.value = false
                break
            case 'create':
                visibleCreate.value = false
                break
            case 'edit':
                visibleEdit.value = false
                break
            case 'delete':
                visibleDelete.value = false
                break
            default:
                console.error('Invalid action:', action)
                break
        }
    }

    function setSelectedObject(object: ObjectType): void {
        selectedObject.value = object
    }

    function openMenu(menu: Menu, event: MouseEvent, object: ObjectType): void {
        setSelectedObject(object)
        menu.toggle(event)
    }

    return {
        visibleShow,
        visibleCreate,
        visibleEdit,
        visibleDelete,
        selectedObject,
        openModal,
        closeModal,
        openMenu,
    }
}
