import { useCallback, useState } from 'react'

export function useMenu<ObjectType = Record<string, unknown>>() {
  const [selectedObject, setSelectedObject] = useState<ObjectType | undefined>(
    undefined
  )

  const handleSetSelectedObject = useCallback((object: ObjectType) => {
    setSelectedObject(object)
  }, [])

  const openMenu = useCallback(
    (
      menuRef:
        | React.RefObject<{ toggle: (event: React.MouseEvent) => void }>
        | { toggle: (event: React.MouseEvent) => void }
        | null,
      event: React.MouseEvent,
      object: ObjectType
    ) => {
      handleSetSelectedObject(object)
      if (
        menuRef &&
        typeof (menuRef as { toggle?: (event: React.MouseEvent) => void })
          .toggle === 'function'
      ) {
        ;(menuRef as { toggle: (event: React.MouseEvent) => void }).toggle(
          event
        )
      }
    },
    [handleSetSelectedObject]
  )

  return {
    selectedObject,
    setSelectedObject: handleSetSelectedObject,
    openMenu,
  }
}
