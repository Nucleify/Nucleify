import { useCallback, useMemo, useState } from 'react'

export interface UseShareSelectionReturn {
  selected: Record<number, boolean>
  isSelected: (id: number) => boolean
  isAllSelected: boolean
  isIndeterminate: boolean
  toggle: (id: number) => void
  toggleAll: () => void
  selectAll: () => void
  deselectAll: () => void
  getSelectedItems: <T extends { id: number }>() => T[]
  clear: () => void
}

export function useShareSelection(
  items: { id: number }[] | undefined
): UseShareSelectionReturn {
  const [selected, setSelected] = useState<Record<number, boolean>>({})

  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  )

  const isAllSelected = useMemo(() => {
    if (!items || items.length === 0) return false
    return items.every((item) => selected[item.id] === true)
  }, [items, selected])

  const isIndeterminate = useMemo(() => {
    if (!items || items.length === 0) return false
    return selectedCount > 0 && selectedCount < items.length
  }, [items, selectedCount])

  const isSelected = useCallback(
    (id: number): boolean => selected[id] === true,
    [selected]
  )

  const toggle = useCallback((id: number): void => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }, [])

  const selectAll = useCallback((): void => {
    if (!items) return

    const newSelected: Record<number, boolean> = {}
    items.forEach((item) => {
      newSelected[item.id] = true
    })
    setSelected(newSelected)
  }, [items])

  const deselectAll = useCallback((): void => {
    setSelected({})
  }, [])

  const toggleAll = useCallback((): void => {
    if (isAllSelected) {
      deselectAll()
    } else {
      selectAll()
    }
  }, [deselectAll, isAllSelected, selectAll])

  const getSelectedItems = <T extends { id: number }>(): T[] => {
    const typedItems = items as T[] | undefined
    if (!typedItems) return []
    return typedItems.filter((item) => selected[item.id] === true)
  }

  const clear = useCallback((): void => {
    setSelected({})
  }, [])

  return {
    selected,
    isSelected,
    isAllSelected,
    isIndeterminate,
    toggle,
    toggleAll,
    selectAll,
    deselectAll,
    getSelectedItems,
    clear,
  }
}
