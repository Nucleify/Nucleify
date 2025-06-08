import type { Ref } from 'vue'
import { ref } from 'vue'

import type { ObjectType, UseMenuInterface } from 'atomic'

export function useMenu(): UseMenuInterface {
  const selectedObject: Ref<ObjectType> = ref<ObjectType>()

  function setSelectedObject(object: ObjectType): void {
    selectedObject.value = object
  }

  // eslint-disable-next-line
  function openMenu(menu: any, event: MouseEvent, object: ObjectType): void {
    setSelectedObject(object)
    menu.toggle(event)
  }

  return {
    selectedObject,
    setSelectedObject,
    openMenu,
  }
}
