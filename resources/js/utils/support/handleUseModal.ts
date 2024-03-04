import { ref } from 'vue'
import { ObjectType } from '../../interfaces'

export default function useModal() {
    const visibleShow = ref(false)
    const visibleCreate = ref(false)
    const visibleEdit = ref(false)
    const visibleDelete = ref(false)
    const selectedObject = ref<ObjectType>(undefined)

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

    return {
        visibleShow,
        visibleCreate,
        visibleEdit,
        visibleDelete,
        selectedObject,
        openModal,
        closeModal,
        setSelectedObject
    }
}
