import { ref, Ref } from 'vue'
import Menu from 'primevue/menu'

import { ObjectType, UseMenuInterface } from 'atomic/bosons/types'

export function useMenu(): UseMenuInterface {
    const selectedObject: Ref<ObjectType> = ref<ObjectType>()

    function setSelectedObject(object: ObjectType): void {
        selectedObject.value = object
    }

    function openMenu(menu: Menu, event: MouseEvent, object: ObjectType): void {
        setSelectedObject(object)
        menu.toggle(event)
    }

    return {
        selectedObject,
        setSelectedObject,
        openMenu,
    }
}
